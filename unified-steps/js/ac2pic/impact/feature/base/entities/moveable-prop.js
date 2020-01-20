ig.module("ac2pic.impact.feature.base.entities.moveable-prop").requires("impact.base.actor-entity").defines(function() {
    ig.ENTITY.MovableProp = ig.AnimatedEntity.extend({
        propSheet: null,
        onGround: false,
        init: function(a, b, d, g) {
            this.parent(a, b, d, g);
            this.coll.type = ig.COLLTYPE.VIRTUAL;
            this.coll.zGravityFactor = 1;
            this.coll.zBounciness = 0;
            this.coll.friction.air = 0.06;
            this.propName = g.propType.name;
            this.propSheet = new ig.PropSheet(g.propType.sheet);
            this.propSheet.addLoadListener(this);
        },
        onLoadableComplete: function(loaded, propSheet) {
            if (!loaded) {
                throw new Error('Not loaded');
            }
            let prop = this.propSheet.getProp(this.propName);

            if (!prop) {
                throw new Error(`Prop "${this.propName}" doesn't exist.`);
            }
            prop.size && Vec3.assign(this.coll.size, prop.size);

            //TODO: Make this dynamic
            this.coll.shadow.size = 16;

            if (prop.anims) this.initAnimations(prop.anims);
            else {
                this.initAnimations({
                    shapeType: "Y_FLAT",
                    sheet: {
                        src: prop.fix.gfx,
                        width: prop.fix.w,
                        height: prop.fix.h,
                        xCount: 1,
                        offX: prop.fix.x || 0,
                        offY: prop.fix.y || 0
                    },
                    SUB: [{
                        name: "default",
                        time: 1,
                        frames: [0],
                        repeat: true
                    }]
                });
                this.setCurrentAnim("default");
            }
        },
        onTouchGround: function() {
            this.onGround = true;
        },
        start: function(face, mag) {
            Vec2.assign(this.coll.vel, face);
            Vec2.length(this.coll.vel, mag);
            this.coll.vel.z = mag;
            this.onGround = false;
        }
    });
});