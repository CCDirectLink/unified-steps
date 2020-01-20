ig.module("ac2pic.feature.bee.base.event-steps").requires("impact.feature.base.event-steps").defines(function() {
    ig.EVENT_STEP.TELEPORT_VAR = ig.EVENT_STEP.TELEPORT.extend({
        start: function() {
            this.map = ig.Event.getExpressionValue(this.map);
            this.marker = ig.Event.getExpressionValue(this.marker);
            this.parent();
        }
    });
});