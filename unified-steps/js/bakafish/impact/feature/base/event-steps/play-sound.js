ig.module("bakafish.impact.feature.base.event-steps.play-sound").requires("impact.feature.base.event-steps").defines(function() {
    ig.EFFECT_ENTRY.PLAY_SOUND.inject({
        init: function(a, b) {
            if (b.sound) this.sound = new ig.Sound(b.sound, b.volume || 1, b.variance || 0, b.group);
            this.global = b.global || false;
            this.loop = b.loop || false;
            this.radius = b.radius || 0;
            this.attachHandle = b.attachHandle || false;
            this.settings = {
                speed: b.speed || 1,
                fadeDuration: b.fadeDuration || 0,
                offset: b.offset || 0
            }
        }
    });
});