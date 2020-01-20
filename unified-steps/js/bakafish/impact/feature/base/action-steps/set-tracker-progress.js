ig.module("bakafish.impact.feature.base.action-steps.set-tracker-progress").requires("impact.feature.base.action-steps").defines(function() {
    ig.ACTION_STEP.SET_TRACKER_PROGRESS = ig.ActionStepBase.extend({
        init: function(a) {
            this.name = a.name || '';
            this.value = a.value || 0;
            this.delta = a.delta || false;
        },
        start: function(a) {
            var b = a.getCombatantRoot().trackers[this.name];
            if (b && b.current !== undefined || b.current !== null) {
                if (this.delta) {
                    b.current += this.value;
                } else {
                    b.current = this.value;
                }
                b.current = Math.min(Math.max(b.current, 0), b.target);
            }
        }
    });
});