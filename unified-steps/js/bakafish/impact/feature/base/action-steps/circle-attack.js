ig.module("bakafish.impact.feature.base.action-steps.circle-attack").requires("impact.feature.base.action-steps").defines(function() {
    ig.ACTION_STEP.CIRCLE_ATTACK = ig.ActionStepBase.extend({
        init: function(a) {
            this.circleSettings = a;
        },
        run: function(a) {
            var settings = {
                ...this.circleSettings
            }
            Object.keys(settings).forEach(key => {
                if (typeof settings[key] === 'object' && !!settings[key].varName) {
                    settings[key] = ig.Event.getExpressionValue(settings[key])
                }
            });
            var b = new sc.CircleHitForce(a, settings);
            sc.combat.addCombatForce(b);
            b.duration > 0 && a.addActionAttached(b);
            return true
        }
    });
});