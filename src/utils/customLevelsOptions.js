import winston from "winston";

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "magenta",
        error: "red",
        warn: "yellow",
        info: "blue",
        http: "gray",
        debug: "white"
    }
}

export default customLevelsOptions;