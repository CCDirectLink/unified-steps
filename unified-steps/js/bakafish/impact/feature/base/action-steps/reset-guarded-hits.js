ig.module("bakafish.impact.feature.base.action-steps.reset-guarded-hits").requires("impact.feature.base.action-steps").defines(function() {
    ig.ACTION_STEP.RESET_GUARDED_HITS = ig.ActionStepBase.extend({
        init: function(a) {},
        start: function(a) {
            a = a.getCombatantRoot();
            a.combo.guardedHits = 0;
            a.combo.guardedEntity = null;
        }
    });
});