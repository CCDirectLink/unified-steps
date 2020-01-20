ig.module("bakafish.impact.feature.base.action-steps.set-attrib-hp").requires("impact.feature.base.action-steps").defines(function() {
    ig.ACTION_STEP.SET_ATTRIB_HP = ig.ActionStepBase.extend({
        init: function(a) {
            this.attribName = a.attribName;
        },
        start: function(a) {
            a.setAttribute(this.attribName, a.hp);
        }
    });
});