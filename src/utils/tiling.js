
export default class Tiling {

    constructor(tileSize=256) {
        this.tileSize = tileSize
        this.initialResolution = 2 * math.pi * 6378137 / this.tileSize
        // # 156543.03392804062 for tileSize 256 pixels
        // 
        self.originShift = 2 * math.pi * 6378137 / 2.0
    }


    // def LatLonToMeters(self, lat, lon ):
    //     "Converts given lat/lon in WGS84 Datum to XY in Spherical Mercator EPSG:900913"

    //     mx = lon * self.originShift / 180.0
    //     my = math.log( math.tan((90 + lat) * math.pi / 360.0 )) / (math.pi / 180.0)

    //     my = my * self.originShift / 180.0
    //     return mx, my

    latLonToMeters(lat, lon) {
        mx = lon * this.originShift / 180.0;
        my = Math.tan((90 + lat) * Math.PI / 360 ) / (Math.PI / 180);

        my = my * this.originShift / 180;
        return {
            mx : mx,
            my : my
        }
    }

    getTileBounds(tx, ty, zoom) {
        res = 180 / 256.0 / 2**zoom
        return (
            tx*256*res - 180,
            ty*256*res - 90,
            (tx+1)*256*res - 180,
            (ty+1)*256*res - 90
        )

    }

    resolution(zoom) {

    }

    pixelsToMeters(px, py, zoom) {

        res = this.resolution( zoom );
        mx = px * res - this.originShift
        my = py * res - this.originShift
        return mx, my
    }


}

function TileBounds(tx, ty, zoom):    
    minx, miny = self.PixelsToMeters( tx*self.tileSize, ty*self.tileSize, zoom )
    maxx, maxy = self.PixelsToMeters( (tx+1)*self.tileSize, (ty+1)*self.tileSize, zoom )
    return ( minx, miny, maxx, maxy )


def PixelsToMeters(self, px, py, zoom):
    "Converts pixel coordinates in given zoom level of pyramid to EPSG:900913"

    res = self.Resolution( zoom )
    mx = px * res - self.originShift
    my = py * res - self.originShift
    return mx, my

def Resolution(self, zoom ):
    "Resolution (meters/pixel) for given zoom level (measured at Equator)"
    
    # return (2 * math.pi * 6378137) / (self.tileSize * 2**zoom)
    return self.initialResolution / (2**zoom)
    

module.exports = {
    TileBounds : TileBounds
}