export const HTTPResponse = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export function handlingErrorResponse(error) {
    switch (error) {
        case HTTPResponse.BAD_REQUEST:
            return "Bad Request";
        case HTTPResponse.UNAUTHORIZED:
            return "Unauthorized";
        case HTTPResponse.FORBIDDEN:
            return "Forbidden";
        case HTTPResponse.NOT_FOUND:
            return "Not Found";
        case HTTPResponse.INTERNAL_SERVER_ERROR:
            return "Internal Server Error";
        default:
            return "Unknown Error";
    }
}