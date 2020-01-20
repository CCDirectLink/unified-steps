ig.module("bakafish.feature.bee.combat.proxy-hp-access").requires("game.feature.combat.entities.combat-proxy").defines(function() {
    var b = Vec3.create(),
        a = {
            ACTION_END_DESTROYED: 1,
            HIT_DESTROYED: 2
        };
    sc.CombatProxyEntity = sc.BasicCombatant.extend({
        hp: 0,
        maxHp: 0,
        breakType: null,
        combatant: null,
        sourceEntity: null,
        externalEntity: null,
        party: 0,
        collaboration: null,
        target: null,
        params: null,
        group: null,
        tackle: {
            attackInfo: null,
            blocked: [],
            hitCount: 0
        },
        effects: {
            onKill: null,
            handle: null
        },
        stickToSource: 0,
        wasHit: false,
        isThreat: true,
        destroyType: 0,
        init: function(a, b, d, g) {
            this.parent(a, b, d, g);
            a = g.data;
            a.size && this.coll.setSize(a.size.x, a.size.y, a.size.z);
            this.setDefaultConfig(a.config);
            this.sourceEntity = g.combatant;
            this.combatant = this.sourceEntity.getCombatantRoot();
            if (!a.timeDisconnect) this.coll.time.parent =
                this.sourceEntity.coll;
            this.noFallDestroy = g.noFallDestroy || false;
            this.terrain = ig.TERRAIN[a.terrain] || null;
            this.party = this.combatant && this.combatant.party;
            this.collaboration = this.combatant.collaboration;
            this.target = this.sourceEntity.getTarget(true);
            this.params = this.combatant.params;
            this.combo.damageCeiling = this.sourceEntity.combo.damageCeiling;
            Vec2.assign(this.face, g.dir);
            this.stickToSource = a.stickToSource || 0;
            this.stickFaceAlign = a.stickFaceAlign || false;
            this.group = a.group;
            this.breakType = a.breakType;
            this.breakType == sc.PROXY_BREAK_TYPE.ACTION ? this.sourceEntity
                .addActionAttached(this) :
                this.breakType == sc.PROXY_BREAK_TYPE.COMBATANT ? this.combatant
                .addEntityAttached(this) :
                this.breakType == sc.PROXY_BREAK_TYPE.COLLABORATION && this.combatant
                .collaboration
                .addCollabAttached(this);
            if (a.copyOwnerAnims) {
                this.animSheet = this.combatant.animSheet;
                this.initAnimations();
                this.storedWalkAnims = ig.copy(this.combatant.storedWalkAnims);
                this.setWalkAnims(this.combatant.walkAnimsName)
            } else {
                if (a.faceAnims || a.animation) {
                    this.animSheet =
                        a.faceAnims || a.animation;
                    this.initAnimations()
                }
                a.walkAnims ? this.storeWalkAnims("default", a.walkAnims) : this
                    .storeWalkAnims("default", {
                        idle: "default"
                    });
                this.setWalkAnims("default")
            }
            this.setAction(a.action);
            if (a.invisible) this.animState.alpha = 0;
            this.maxHp = this.hp = a.hp;
            this.effects.onKill = a.killEffect
        },
        getCombatantRoot: function() {
            return this.combatant
        },
        getSourceEntity: function() {
            return this.sourceEntity
        },
        connectExternal: function(a) {
            if (this.externalEntity) {
                this.externalEntity.removeEntityAttached(this);
                this.externalEntity = null
            }
            if (a)
                if (a.isDefeated && a.isDefeated()) this.destroy();
                else {
                    this.externalEntity = a;
                    this.externalEntity.addEntityAttached(this)
                }
        },
        update: function() {
            this.breakType == sc.PROXY_BREAK_TYPE.COMBATANT && this.combatant
                .isDefeated() && this
                .destroy();
            this.coll.pos.z < ig.game.minLevelZ && (!this.stickToSource && !this
                    .noFallDestroy) && this
                .destroy();
            if (this.stickToSource) {
                var a = this.stickToSource == sc.PROXY_STICK_TYPE.TARGET ? this
                    .getTarget() : this
                    .sourceEntity;
                if (a) {
                    var d = ig.CollTools.getCenterXYAlignedPos(b,
                        this.coll, a.coll);
                    this.setPos(d.x, d.y, a.coll.pos.z);
                    this.stickFaceAlign && a.face && Vec2.assign(this.face, a.face)
                }
            }
            this.parent()
        },
        onActionEndDetach: function() {
            this.destroy()
        },
        onEntityKillDetach: function() {
            this.destroy()
        },
        onCollabEndDetach: function() {
            this.destroy()
        },
        postActionUpdate: function() {
            this.currentAction || this.destroy()
        },
        detach: function() {
            if (this.externalEntity) {
                this.externalEntity.removeEntityAttached(this);
                this.externalEntity = null
            }
            this.breakType == sc.PROXY_BREAK_TYPE.ACTION ? this.sourceEntity
                .removeActionAttached(this) :
                this.breakType == sc.PROXY_BREAK_TYPE.COMBATANT ? this.combatant
                .removeEntityAttached(
                    this) : this.breakType == sc.PROXY_BREAK_TYPE.COLLABORATION && this
                .combatant
                .collaboration && this.combatant.collaboration.removeCollabAttached(this)
        },
        onEffectEvent: function(a) {
            a.isDone() && this.kill()
        },
        destroy: function(b) {
            if (!this.destroyType) {
                this.destroyType = b || a.ACTION_END_DESTROYED;
                this.detach();
                if (this.effects.onKill) {
                    this.cancelAction();
                    Vec2.assignC(this.coll.accelDir, 0, 0);
                    if (!this.effects.handle) {
                        this.effects.handle =
                            this.effects.onKill.spawnOnTarget(this, {
                                align: "CENTER",
                                callback: this
                            });
                        this.coll.setType(ig.COLLTYPE.NONE)
                    }
                } else this.kill()
            }
        },
        ballHit: function(a) {
            if (this.hp) {
                if (a.party == this.combatant.party) return false;
                var b = a.getHitCenter(this);
                this.wasHit = true;
                if (this.hp < 0) {
                    sc.combat.showHitEffect(this, b, sc.ATTACK_TYPE.NONE, a.getElement(),
                        false, false);
                    return true
                }
                var d = a.attackInfo.damageFactor;
                sc.combat.showHitEffect(this, b, a.attackInfo.type, a.getElement(), false,
                    false);
                this.reduceHp(d);
                return true
            }
            return false
        },
        setMaxHp: function(a) {
            this.hp = this.maxHp > 0 && a > 0 ? this.hp * (a / this.maxHp) : a;
            this.maxHp = a
        },
        reduceHp: function(b) {
            this.hp = this.hp - b;
            this.hp <= 0 && this.destroy(a.HIT_DESTROYED)
        },
        onVarAccess: function(b, d) {
            return d[1] == "collab" ? !this.collaboration ? null : this.collaboration
                .onVarAccess(b, d) :
                d[1] == "ownerAttrib" ? ig.vars.resolveObjectAccess(this.combatant
                    .attributes, d, 2) : d[
                    1] == "srcAttrib" ? ig.vars.resolveObjectAccess(this.sourceEntity
                    .attributes, d, 2) : d[
                    1] == "owner" ? ig.vars.forwardEntityVarAccess(this.combatant, d, 2) :
                d[1] == "src" ? ig.vars.forwardEntityVarAccess(this.sourceEntity, d, 2) :
                d[1] ==
                "destroyed" ? this.destroyType != 0 : d[1] == "hitDestroyed" ? this
                .destroyType == a
                .HIT_DESTROYED : d[1] == "wasHit" ? this.wasHit : d[1] == "hp" ? this.hp :
                this.parent(b, d)
        }
    });
    var d = new ig.ActorConfig({
        walkAnims: "default",
        collType: "IGNORE",
        maxVel: 180,
        weight: -1,
        flyHeight: 0,
        soundType: "none",
        friction: 1,
        accelSpeed: 1,
        bounciness: 0
    });
    sc.CombatProxyEntity.createActorConfig = function(a) {
        var b = new ig.ActorConfig;
        b.loadFromData(a, d);
        return b
    };
    sc.CombatProxyTools = {
        clearEntityProxy: function(a,
            b, d, g) {
            g = this.clearAttachedProxy(a.entityAttached, b, d, g);
            this.clearAttachedProxy(a.actionAttached, b, d, g)
        },
        hasProxy: function(a, b) {
            return this.hasAttachedProxy(a.entityAttached, b) || this.hasAttachedProxy(a.actionAttached,
                b)
        },
        clearAttachedProxy: function(a, b, d, g) {
            for (var h = a.length; h--;) {
                var i = a[h];
                if (i instanceof sc.CombatProxyEntity && (!d || i.stickToSource)) b && i.group != b || (
                    g ?
                    g-- : i.destroy())
            }
            return g || 0
        },
        hasAttachedProxy: function(a, b) {
            for (var d = a.length; d--;) {
                var g = a[d];
                if (g instanceof sc.CombatProxyEntity &&
                    g.group == b) return true
            }
        }
    };
});