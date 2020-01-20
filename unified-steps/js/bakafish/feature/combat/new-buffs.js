ig.module("bakafish.feature.bee.combat.new-buffs").requires("game.feature.combat.stat-change", "game.feature.combat.model.combat-params").defines(function() {

    sc.STAT_CHANGE_SETTINGS["DEFENSE-MINUS-MINOR-1"] = {
        change: sc.STAT_CHANGE_TYPE.STATS,
        type: sc.STAT_PARAM_TYPE.DEFENSE,
        value: 0.8,
        negative: true,
        icon: "stat-defense",
        grade: "stat-rank-down-1"
    };

    sc.STAT_CHANGE_SETTINGS["DEFENSE-MINUS-MINOR-2"] = {
        change: sc.STAT_CHANGE_TYPE.STATS,
        type: sc.STAT_PARAM_TYPE.DEFENSE,
        value: 0.65,
        negative: true,
        icon: "stat-defense",
        grade: "stat-rank-down-2"
    };

    sc.STAT_CHANGE_SETTINGS["DYNAMO-CHARGE-ATTACK-1"] = {
        change: sc.STAT_CHANGE_TYPE.STATS,
        type: sc.STAT_PARAM_TYPE.ATTACK,
        value: 1.2,
        negative: false,
        icon: "stat-defense",
        grade: "stat-rank-up-1"
    };

    sc.STAT_CHANGE_SETTINGS["DYNAMO-CHARGE-ATTACK-2"] = {
        change: sc.STAT_CHANGE_TYPE.STATS,
        type: sc.STAT_PARAM_TYPE.ATTACK,
        value: 1.4,
        negative: false,
        icon: "stat-defense",
        grade: "stat-rank-up-2"
    };

    sc.STAT_CHANGE_SETTINGS["DYNAMO-CHARGE-ATTACK-3"] = {
        change: sc.STAT_CHANGE_TYPE.STATS,
        type: sc.STAT_PARAM_TYPE.ATTACK,
        value: 1.6,
        negative: false,
        icon: "stat-defense",
        grade: "stat-rank-up-3"
    };

    sc.STAT_CHANGE_SETTINGS["DYNAMO-CHARGE-FOCUS-1"] = {
        change: sc.STAT_CHANGE_TYPE.STATS,
        type: sc.STAT_PARAM_TYPE.FOCUS,
        value: 1.3,
        negative: false,
        icon: "stat-defense",
        grade: "stat-rank-up-1"
    };

    sc.STAT_CHANGE_SETTINGS["DYNAMO-CHARGE-FOCUS-2"] = {
        change: sc.STAT_CHANGE_TYPE.STATS,
        type: sc.STAT_PARAM_TYPE.FOCUS,
        value: 1.6,
        negative: false,
        icon: "stat-defense",
        grade: "stat-rank-up-2"
    };

    sc.STAT_CHANGE_SETTINGS["DYNAMO-CHARGE-FOCUS-3"] = {
        change: sc.STAT_CHANGE_TYPE.STATS,
        type: sc.STAT_PARAM_TYPE.FOCUS,
        value: 2.0,
        negative: false,
        icon: "stat-defense",
        grade: "stat-rank-up-3"
    };

    sc.ActionBuff = sc.StatChange.extend({
        timer: 0,
        time: 0,
        hasTimer: false,
        active: true,
        name: null,
        hacked: false,
        init: function(a, b, e, f) {
            this.parent(a);
            this.name = b;
            this.hacked = e || false;
            this.timer = this.time = f || 0;
            this.hasTimer = (this.time || 0) === 0;
        },
        update: function() {
            if (this.timer > 0) {
                this.timer--;
                if (this.timer == 0) {
                    return true;
                }
            }
            return !this.active;
        },
        onActionEndDetach: function() {
            if (this.timer == 0) {
                this.active = false;
            }
        },
        onEntityKillDetach: function() {
            this.active = false;
        },
        clear: function() {
            if (this.timer == 0) {
                this.active = false
            }
        },
        reset: function(a) {
            this.timer = this.time = a + this.timer
        },
        getTimeFactor: function() {
            return this.active && this.time >= 0 ? (this.time === 0 ? 1 : this.timer / this.time) : 0
        }
    });
});