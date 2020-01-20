ig.module("bakafish.impact.feature.base.action-steps.wait-until-target-on-ground").requires("impact.feature.base.action-steps").defines(function() {
    ig.ACTION_STEP.WAIT_UNTIL_TARGET_ON_GROUND = ig.ActionStepBase.extend({
        init: function(a) {
            this.maxTime = a.maxTime || 0;
        },
        start: function(a) {
            a.stepTimer = a.stepTimer + this.maxTime
        },
        run: function(a) {
            if (!(a = a.getTarget())) return true;
            if (this.maxTime && a.stepTimer <= 0 || a.coll.vel.z >= 0 && !a.coll.zGravityFactor)
                return true;
            return a.coll.pos.z ==
                a.coll.baseZPos
        }
    });
});