export const fifteenMinutesFromNow = () => {
    return new Date(Date.now() + 15 * 60 * 1000);
}

export const oneHourFromNow = () => {
    return new Date(Date.now() + 60 * 60 * 1000);
}

export const sevenDaysFromNow = () => {
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}

export const thirtyDaysFromNow = () => {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
}

export const fiveMinutesAgo = () => new Date(Date.now() - 5 * 60 * 1000);

export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;