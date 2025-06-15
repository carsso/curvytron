/**
 * Base room configuration
 */
function BaseRoomConfig(room)
{
    EventEmitter.call(this);

    this.room     = room;
    this.maxScore = null;
    this.gameDuration = null;
    this.open     = true;
    this.team     = false;
    this.password = null;

    this.variables = {
        bonusRate: 0
    };

    this.bonuses  = {
        BonusSelfGodzilla: true,
        BonusSelfSmall: true,
        BonusSelfSlow: true,
        BonusSelfFast: true,
        BonusSelfMaster: true,
        BonusEnemySlow: true,
        BonusEnemyFast: true,
        BonusEnemyBig: true,
        BonusEnemyInverse: true,
        BonusEnemyStraightAngle: true,
        BonusGameBorderless: true,
        BonusAllColor: true,
        BonusGameClear: true
    };
}

BaseRoomConfig.prototype = Object.create(EventEmitter.prototype);
BaseRoomConfig.prototype.constructor = BaseRoomConfig;

/**
 * Password length
 *
 * @type {Number}
 */
BaseRoomConfig.prototype.passwordLength = 4;

/**
 * Set max score
 *
 * @param {Number} maxScore
 */
BaseRoomConfig.prototype.setMaxScore = function(maxScore)
{
    maxScore = parseInt(maxScore, 10);

    this.maxScore = maxScore ? maxScore : null;

    return true;
};

/**
 * Variable exists
 *
 * @param {String} variable
 *
 * @return {Boolean}
 */
BaseRoomConfig.prototype.variableExists = function(variable)
{
    return typeof(this.variables[variable]) !== 'undefined';
};

/**
 * Set variable
 *
 * @param {String} variable
 * @param {Float} value
 */
BaseRoomConfig.prototype.setVariable = function(variable, value)
{
    if (!this.variableExists(variable)) { return false; }

    value = parseFloat(value);

    if (-1 > value || value > 1 ) { return false; }

    this.variables[variable] = value;

    return true;
};

/**
 * Get variable
 *
 * @param {String} variable
 *
 * @return {Float}
 */
BaseRoomConfig.prototype.getVariable = function(variable)
{
    if (!this.variableExists(variable)) { return; }

    return this.variables[variable];
};

/**
 * Bonus exists
 *
 * @param {String} bonus
 *
 * @return {Boolean}
 */
BaseRoomConfig.prototype.bonusExists = function(bonus)
{
    return typeof(this.bonuses[bonus]) !== 'undefined';
};

/**
 * Toggle bonus
 *
 * @param {String} bonus
 *
 * @return {Boolean}
 */
BaseRoomConfig.prototype.toggleBonus = function(bonus)
{
    if (!this.bonusExists(bonus)) { return false; }

    this.bonuses[bonus] = !this.bonuses[bonus];

    return true;
};

/**
 * Get bonus value
 *
 * @param {String} bonus
 *
 * @return {Boolean}
 */
BaseRoomConfig.prototype.getBonus = function(bonus)
{
    if (!this.bonusExists(bonus)) { return; }

    return this.bonuses[bonus];
};

/**
 * Set bonus value
 *
 * @param {String} bonus
 * @param {Boolean} value
 *
 * @return {Boolean}
 */
BaseRoomConfig.prototype.setBonus = function(bonus, value)
{
    if (!this.bonusExists(bonus)) { return; }

    this.bonuses[bonus] = value ? true : false;
};

/**
 * Get max score
 *
 * @return {Number}
 */
BaseRoomConfig.prototype.getMaxScore = function()
{
    return this.maxScore ? this.maxScore : this.getDefaultMaxScore();
};

/**
 * Set game duration
 *
 * @param {Number} duration in seconds
 */
BaseRoomConfig.prototype.setGameDuration = function(duration)
{
    duration = parseInt(duration, 10);

    this.gameDuration = duration ? duration : null;

    return true;
};

/**
 * Get game duration in seconds
 *
 * @return {Number}
 */
BaseRoomConfig.prototype.getGameDurationInSeconds = function()
{
    return this.gameDuration ? this.gameDuration : this.getDefaultGameDuration();
};

/**
 * Get default game duration in seconds
 *
 * @return {Number}
 */
BaseRoomConfig.prototype.getDefaultGameDuration = function()
{
    return 10 * 60; // 10 minutes
};

/**
 * Get max score
 *
 * @param {Number} players
 *
 * @return {Number}
 */
BaseRoomConfig.prototype.getDefaultMaxScore = function()
{
    return Math.max(1, (this.room.players.count() - 1) * 10);
};

/**
 * Authorise joinning the room
 *
 * @param {String} password
 *
 * @return {Boolean}
 */
BaseRoomConfig.prototype.allow = function(password)
{
    return this.open || this.password === password;
};

/**
 * Generate password
 *
 * @return {String}
 */
BaseRoomConfig.prototype.generatePassword = function()
{
    var password = '';

    for (var i = 0; i < this.passwordLength; i++) {
        password += Math.ceil(Math.random() * 9).toString();
    }

    return password;
};

/**
 * Serialize
 *
 * @return {Object}
 */
BaseRoomConfig.prototype.serialize = function()
{
    return {
        maxScore: this.maxScore,
        gameDuration: this.gameDuration,
        variables: this.variables,
        bonuses: this.bonuses,
        open: this.open,
        team: this.team,
        password: this.password
    };
};
