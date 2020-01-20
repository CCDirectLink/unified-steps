ig.module("bakafish.impact.feature.base.action-steps.throwable-prop").requires("impact.feature.base.action-steps").defines(function() {
    ig.ACTION_STEP.THROW_MOVABLE_PROP = ig.ActionStepBase.extend({
        init: function(details) {
            this.propName = details.propName;
            this.magnitude = details.magnitude || 200;
        },
        start: function(a) {
            this.prop = ig.game.getEntityByName(this.propName);
            if (this.prop) {
                this.prop.start(a.face, this.magnitude);
            }
        },
        run: function() {
            return this.prop.onGround;
        }
    });
});