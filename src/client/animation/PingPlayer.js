/**
 * PingPlayer animation
 *
 * @param {Avatar} avatar
 * @param {Canvas} effect
 */
function PingPlayer(avatar, effect)
{
    this.avatar = avatar;
    this.effect    = effect;
    this.created   = new Date().getTime();
    this.done      = false;
    this.cleared   = false;


    var thisRef = this;
    this.effectTimer = setInterval(function() { thisRef.draw(); }, this.framerate);
}

/**
 * Effect radius
 *
 * @type {Number}
 */
PingPlayer.prototype.radius = 80;

/**
 * Effect line width
 *
 * @type {Number}
 */
PingPlayer.prototype.lineWidth = 6;

/**
 * Animation duration
 *
 * @type {Number}
 */
PingPlayer.prototype.duration = 3000;


/**
 * Draw particles
 */
PingPlayer.prototype.draw = function ()
{
    if (this.done) { return; }

    this.clear();

    this.lastRender = new Date().getTime();
    this.cleared    = false;

    var age = this.lastRender - this.created;

    if (age <= this.duration) {

        var step = age / this.duration;

        this.effect.outlineCircle(this.avatar.startX + this.avatar.canvasRadius, this.avatar.startY + this.avatar.canvasRadius, this.radius * this.easingFunction(step), this.lineWidth, this.avatar.color);

        this.effect.drawImageScaledAngle(this.avatar.arrow.element, this.avatar.x - 5, this.avatar.y - 5, 10, 10, this.avatar.angle);
    } else {
        this.clear();
        console.log('done');
        clearTimeout(this.effectTimer);
        this.done = true;
    }
};

/**
 * Clear particles from cache
 */
PingPlayer.prototype.clear = function ()
{
    if (this.cleared) { return; }

    
    this.effect.clearZone(this.avatar.startX - this.radius, this.avatar.startY - this.radius, this.radius * 2.4, this.radius * 2.4);

    this.cleared = true;
};


/**
 * Radius easing function
 */
PingPlayer.prototype.easingFunction = function (x)
{
    return this.smoothStart3(x) * this.flip(this.smoothStop3(x)) * 250;
};

PingPlayer.prototype.smoothStart3 = function(x)
{
    return x * x * x * x;
};

PingPlayer.prototype.smoothStop3 = function(x)
{
    return this.flip(this.smoothStart3(this.flip(x)));
};

PingPlayer.prototype.flip = function(x)
{
    return 1 - x;
};
