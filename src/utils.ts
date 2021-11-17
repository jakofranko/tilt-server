import slugify from 'slugify';
import type {
    Beer,
    BeerRow,
    TiltEvent,
    TiltDataRow
 } from './types';

export function sanitizeTiltEvent(tiltEvent: TiltEvent): Beer {
    const {
        Beer: beerName,
        Temp,
        SG,
        Color,
        Comment,
        Timepoint,
    } = tiltEvent;
    return {
        beer: beerName,
        slug: slugify(beerName),
        temp: Temp,
        sg: SG,
        color: Color,
        comment: Comment,
        timepoint: Timepoint
    };
}

export function sanitizeCsvRow(row: TiltDataRow): BeerRow {
    const {
        Beer: beerName,
        Temp,
        SG,
        Color,
        Comment,
        Timepoint,
        Timestamp
    } = row;
    return {
        beer: beerName,
        slug: slugify(beerName),
        temp: Temp,
        sg: SG,
        color: Color,
        comment: Comment,
        timepoint: Timepoint,
        timestamp: Timestamp
    };
}
