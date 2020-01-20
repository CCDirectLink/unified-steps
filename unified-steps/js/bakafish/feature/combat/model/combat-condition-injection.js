ig.module("bakafish.feature.bee.combat.model.combat-condition-injection").requires("game.feature.combat.model.combat-condition")
    .defines(function() {

        sc.CombatConditions.prototype.checkOr = function(a, b, c, d) {
            ig.vars.pushEntityAccessor(a);
            for (var e = 0; e < this.conditions.length; ++e) {
                var f = this.conditions[e].check(a, b, c, d);
                if (!this.conditions[e].not && f || this.conditions[e].not && !f) {
                    ig.vars.popEntityAccessor(a);
                    return true
                }
            }
            ig.vars.popEntityAccessor(a);
            return false
        };

        sc.COMBAT_CONDITION.ANY_OF = ig.Class.extend({
            conditions: null,
            init: function(a) {
                this.conditions = new sc.CombatConditions(a.conditions);
            },
            check: function(a, b) {
                return this.conditions.checkOr(a, b)
            }
        });

        sc.COMBAT_CONDITION.TRACKER_PROGRESS = ig.Class.extend({
            min: 0,
            max: 1,
            name: '',
            init: function(a) {
                this.min = a.min;
                this.max = a.max;
                this.name = a.name;
            },
            check: function(a) {
                var b = a.getCombatantRoot().trackers[this.name];
                return b && b.current !== undefined &&
                    b.current !== null &&
                    b.target !== undefined &&
                    b.current / b.target >= this.min &&
                    b.current / b.target < this.max
            }
        });

        sc.COMBAT_CONDITION.HIT_STABLE = ig.Class.extend({
            hitStable: "NONE",
            operator: "==",
            target: "SELF",
            init: function(a) {
                this.hitStable = sc.ATTACK_TYPE[a.hitStable] || sc.ATTACK_TYPE["NONE"];
                this.operator = a.operator || "==";
                this.target = a.target;
            },
            check: function(a) {
                var b = a.getCombatantRoot();
                var b = this.target == "SELF" ? b.hitStable : this.target == "TARGET" && b.getTarget() ? b.getTarget().hitStable : 0;
                switch (this.operator) {
                    case "==":
                        return b == this.hitStable;
                    case "!=":
                        return b != this.hitStable;
                    case "<":
                        return b < this.hitStable;
                    case "<=":
                        return b <= this.hitStable;
                    case ">":
                        return b > this.hitStable;
                    case ">=":
                        return b >= this.hitStable;
                    default:
                        return false;
                }
            }
        });
    });