import type { Beer, TiltEvent } from './types';

export function sanitizeTiltEvent(tiltEvent: TiltEvent): Beer {
    const {
        Beer: beerName,
        Temp,
        SG,
        Color,
        Comment,
        Timepoint
    } = tiltEvent.parameter;
    return {
        beer: beerName,
        temp: Temp,
        sg: SG,
        color: Color,
        comment: Comment,
        timepoint: Timepoint
    };
}
