ig.module("bakafish.impact.feature.base.action-steps.wait-until-guarded-fix").requires("impact.feature.base.action-steps").defines(function() {
    ig.ACTION_STEP.WAIT_UNTIL_GUARDED = ig.ActionStepBase.extend({
        _wm: new ig.Config({
            attributes: {
                maxTime: {
                    _type: "Number",
                    _info: "Maximum time to wait"
                },
                meleeOnly: {
                    _type: "Boolean",
                    _info: "Only continue when melee attack was guarded"
                }
            }
        }),
        init: function(a) {
            this.maxTime = a.maxTime;
            this.meleeOnly = a.meleeOnly || false,
                this.mobile = a.mobile || false;
        },
        start: function(a) {
            a.stepTimer = a.stepTimer + this.maxTime
        },
        run: function(a) {
            // stepTimer should not use combatant root
            var b = a;
            a = a.getCombatantRoot();
            if (a.isPlayer)
                if (ig.input.currentDevice == ig.INPUT_DEVICES.KEYBOARD_AND_MOUSE)
                    (this.mobile && a.isPlayer && a.currentAction != null) || a.gui.crosshair.getDir(a.face);
                else {
                    sc.control.moveDir(r, 1);
                    if (!this.mobile) {
                        Vec2.isZero(r) || Vec2.assign(a.face, r)
                    } else {
                        !a.isPlayer || a.playerTrack.startedAction || Vec2.isZero(r) || Vec2.assign(a.face, r);
                    }
                } a.combo.guardTrapTime = a.combo.guardTrapTime + ig.system.tick;
            if (b.stepTimer <= 0 || a.combo.guardedHits > 0 &&
                (!this.meleeOnly || a.hasBlockEntity())) {
                a.combo.guardTrapTime = 0;
                return true
            }
            return false
        }
    });
});