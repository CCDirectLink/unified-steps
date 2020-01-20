ig.module("ac2pic.feature.menu.gui.save.save-misc").requires("game.feature.menu.gui.save.save-misc").defines(function() {
    function getOverrideMapName(save) {
        if (save) {
            const mapPath = save.map.toPath("", "").toCamel();
            const mapStorage = save.vars.storage.maps[mapPath];
            if (mapStorage && mapStorage.override) {
                return ig.LangLabel.getText(mapStorage.override);
            }
        }
        return null;
    }

    sc.SaveSlotLocation.inject({
        setLocation: function(save) {
            this.parent(save);
            const overrideMapName = getOverrideMapName(save);
            if (overrideMapName) {
                const areaName = this.location.text.split("-")[0].trim();
                this.location.setText(`${areaName} - ${overrideMapName}`);
            }
        }
    });
});