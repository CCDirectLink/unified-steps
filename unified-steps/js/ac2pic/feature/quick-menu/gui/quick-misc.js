ig.module("ac2pic.feature.quick-menu.gui.quick-misc").requires("game.feature.quick-menu.gui.quick-misc").defines(function() {
    function getOverrideMapName() {
        const overrideMap = ig.vars.get("map.override");
        if (overrideMap) {
            return ig.LangLabel.getText(overrideMap);
        }

        return null;
    }

    sc.QuickLocationBox.inject({
        updateLocationName: function() {
            this.parent();
            const overrideMapName = getOverrideMapName();
            if (overrideMapName) {
                this.location.setText(`${sc.map.getCurrentAreaName()} - ${overrideMapName}`);
                this.setSize(this.location.hook.size.x + 30, 20);
            }
        }
    })
});