ig.module("ac2pic.feature.base.entities.map-touch-trigger").requires("impact.feature.base.entities.touch-trigger").defines(function() {
    ig.ENTITY.MapTouchTrigger = ig.Entity.extend({
        name: "",
        face: Vec2.create(),
        mapName: null,
        isOn: false,
        _wm: new ig.Config({
            spawnable: true,
            attributes: {
                mapName: {
                    _type: "LangLabel",
                    _info: "Map name to override."
                }
            }
        }),
        init: function(x, y, z, settings) {
            this.parent(x, y, z, settings);
            this.coll.type = ig.COLLTYPE.NONE;
            this.isOn = false;
            this.shape = ig.COLLSHAPE.RECTANGLE;
            this.mapName = settings.mapName || null;
        },
        update: function() {
            const coll = this.coll;
            const playerEntity = ig.game.playerEntity;

            if (playerEntity) {
                if (playerEntity.coll.intersectsWith(coll.pos.x, coll.pos.y, coll.pos.z, coll.size.x, coll.size.y, coll.size.z, true, this.shape)) {
                    if (!this.isOn) {
                        ig.vars.set("map.override", this.mapName);
                        ig.vars.set("map.mapId", this.mapName.id);
                        this.isOn = true;
                    }
                } else {
                    this.isOn = false;
                }
            }
        }
    });
});