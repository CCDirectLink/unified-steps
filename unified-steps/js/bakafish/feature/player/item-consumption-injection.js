ig.module("bakafish.feature.bee.player.item-consumption-injection").requires("game.feature.player.item-consumption").defines(function() {
    sc.ItemConsumption.inject({
        createAction: function(b) {
            sc.model.player.params.getModifier("ITEM_GUARD") && b.unshift({
                type: "SET_HIT_STABLE",
                value: "MASSIVE"
            });
            // negate upward z velocity
            sc.model.player.onVarAccess("player.entity", ["player", "entity"]).coll.vel.z > 0 && b.unshift({
                type: "SET_Z_VEL",
                value: 0
            });
            // do not allow action until player hits the ground
            b.push({
                type: "WAIT_UNTIL_ON_GROUND"
            });
            b = new ig.Action("consumeItem", b);
            b.eventAction = true;
            return b
        }
    });
});