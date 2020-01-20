ig.module("bakafish.impact.feature.base.action-steps.timed-action-buff").requires(
    "impact.feature.base.action-steps",
    "game.feature.combat.stat-change").defines(function() {
    var d = {
        SELF: function(a) {
            return a
        },
        PROXY_OWNER: function(a) {
            return a.getCombatantRoot()
        },
        PROXY_SRC: function(a) {
            return a.sourceEntity
        },
        TARGET: function(a) {
            return a.getTarget()
        }
    };
    ig.ACTION_STEP.ADD_TIMED_ACTION_BUFF = ig.ActionStepBase.extend({
        init: function(a) {
            this.target = d[a.target] || d.SELF;
            this.stats = a.stats;
            this.name = a.name || null;
            this.hacked = a.hacked || false;
            this.time = a.ticks || 0;
        },
        start: function(a) {
            var b =
                this.target(a);
            if (b && b.params) {
                var c = new sc.ActionBuff(this.stats, this.name, this.hacked, this.time);
                if (b.params.buffs) {
                    var match = b.params.buffs.find(buff => buff.name === c.name);
                    if (match) {
                        match.active = false;
                        b.params.removeBuff(match);
                    }
                }
                b.params.addBuff(c);
                a.addActionAttached(c);
            }
        }
    });
});