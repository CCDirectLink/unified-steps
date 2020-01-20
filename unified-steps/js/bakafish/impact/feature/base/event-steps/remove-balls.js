ig.module("bakafish.impact.feature.base.event-steps.remove-balls").requires("impact.feature.base.event-steps").defines(function() {
    ig.EVENT_STEP.REMOVE_BALLS = ig.EventStepBase.extend({
        init: function(a) {},
        start: function() {
            for (var a = ig.game.entities, b = a.length; b--;) {
                var d = a[b];
                d && (d instanceof ig.ENTITY.Ball) && d.destroy()
            }
        }
    });
});