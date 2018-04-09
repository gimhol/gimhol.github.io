export const getClassName = function(a){
  return Object.prototype.toString.call(a)
}

export const isArray = function(a){
  return getClassName(a) === '[object Array]'
}

export const trackTransform = function (ctx) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var xform = svg.createSVGMatrix();
    var savedTransforms = [];

    ctx.getTransform = function () { return xform; };

    var save = ctx.save;
    ctx.save = function () {
        savedTransforms.push(xform.translate(0, 0));
        return save.call(ctx);
    };

    var restore = ctx.restore;
    ctx.restore = function () {
        xform = savedTransforms.pop();
        return restore.call(ctx);
    };

    var scale = ctx.scale;
    ctx.scale = function (sx, sy) {
        xform = xform.scaleNonUniform(sx, sy);
        return scale.call(ctx, sx, sy);
    };

    var rotate = ctx.rotate;
    ctx.rotate = function (deg) {
        xform = xform.rotate(deg);
        return rotate.call(ctx, deg);
    };

    var translate = ctx.translate;
    ctx.translate = function (dx, dy) {
        xform = xform.translate(dx, dy);
        return translate.call(ctx, dx, dy);
    };

    var transform = ctx.transform;
    ctx.transform = function (a, b, c, d, e, f) {
        var m2 = svg.createSVGMatrix();
        m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
        xform = xform.multiply(m2);
        return transform.call(ctx, a, b, c, d, e, f);
    };

    var setTransform = ctx.setTransform;
    ctx.setTransform = function (a, b, c, d, e, f) {
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx, a, b, c, d, e, f);
    };

    var pt = svg.createSVGPoint();
    //通过原坐标系点x，y求对应当前坐标系的坐标值
    ctx.transformedPoint = function (x, y) {
        pt.x = x; pt.y = y;
        return pt.matrixTransform(xform.inverse());
    }
    var pt2 = svg.createSVGPoint();
    //当前坐标系中的的xy还原到原坐标系坐标值
    ctx.transformedPoint2 = function (x, y) {
        pt2.x = x; pt2.y = y;
        return pt2.matrixTransform(xform);
    }
    var clearRect = ctx.clearRect;
    ctx.clearRect = function (x, y, w, h) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        clearRect.call(ctx, x, y, w, h);
        ctx.restore();
    }
}
