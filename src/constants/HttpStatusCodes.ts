enum HttpStatusCodes {
    //* Informational responses
    CONTINUE = 100, //* The server has received the request headers and the client should proceed to send the request body.
    SWITCHING_PROTOCOLS = 101, //* The requester has asked the server to switch protocols and the server has agreed to do so.
    PROCESSING = 102, //* Used to return some response headers before the final HTTP message.
    EARLY_HINTS = 103, //* Indicates that the server is sending the response headers, before the final HTTP message.

    //* Successful responses
    OK = 200, //* The request was successful.
    CREATED = 201, //* The request has been fulfilled, and a new resource has been created.
    ACCEPTED = 202, //* The request has been accepted for processing, but the processing has not been completed.
    NON_AUTHORITATIVE_INFORMATION = 203, //* The server is a transforming proxy that received a 200 OK from its origin, but is returning a modified version of the origin's response.
    NO_CONTENT = 204, //* The server successfully processed the request but is not returning any content.
    RESET_CONTENT = 205, //* The server successfully processed the request, asks that the requester reset its document view, and is not returning any content.
    PARTIAL_CONTENT = 206, //* The server is delivering only part of the resource due to a range header sent by the client.
    MULTI_STATUS = 207, //* A status code for multiple independent operations.
    ALREADY_REPORTED = 208, //* The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.
    IM_USED = 226, //* The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.

    //* Redirection responses
    MULTIPLE_CHOICES = 300, //* The request has more than one possible response. The user-agent or user should choose one of them.
    MOVED_PERMANENTLY = 301, //* This and all future requests should be directed to the given URI.
    FOUND = 302, //* The requested resource resides temporarily under a different URI.
    SEE_OTHER = 303, //* The response to the request can be found under another URI using a GET method.
    NOT_MODIFIED = 304, //* Indicates that the resource has not been modified since the version specified by the request headers.
    USE_PROXY = 305, //* The requested resource must be accessed through the proxy given by the location field.
    SWITCH_PROXY = 306, //* No longer used. Originally meant "Subsequent requests should use the specified proxy."
    TEMPORARY_REDIRECT = 307, //* The request should be repeated with another URI; however, future requests should still use the original URI.
    PERMANENT_REDIRECT = 308, //* The request, and all future requests, should be repeated using another URI.

    //* Client error responses
    BAD_REQUEST = 400, //* The server could not understand the request due to invalid syntax.
    UNAUTHORIZED = 401, //* Similar to 403 Forbidden, but specifically for authentication.
    PAYMENT_REQUIRED = 402, //* Reserved for future use.
    FORBIDDEN = 403, //* The client does not have permission to access the requested resource.
    NOT_FOUND = 404, //* The server cannot find the requested resource.
    METHOD_NOT_ALLOWED = 405, //* The method specified in the request is not allowed for the resource identified by the request URI.
    NOT_ACCEPTABLE = 406, //* The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
    PROXY_AUTHENTICATION_REQUIRED = 407, //* The client must first authenticate itself with the proxy.
    REQUEST_TIMEOUT = 408, //* The server timed out waiting for the request.
    CONFLICT = 409, //* Indicates that the request could not be processed because of conflict in the current state of the resource.
    GONE = 410, //* Indicates that the resource requested is no longer available and will not be available again.
    LENGTH_REQUIRED = 411, //* The server refuses to accept the request without a defined Content-Length.
    PRECONDITION_FAILED = 412, //* The server does not meet one of the preconditions that the requester put on the request.
    PAYLOAD_TOO_LARGE = 413, //* The request is larger than the server is willing or able to process.
    URI_TOO_LONG = 414, //* The URI provided was too long for the server to process.
    UNSUPPORTED_MEDIA_TYPE = 415, //* The server does not support the media type that the client provided in the request.
    RANGE_NOT_SATISFIABLE = 416, //* The client has asked for a portion of the file, but the server cannot supply that portion.
    EXPECTATION_FAILED = 417, //* The server cannot meet the requirements of the Expect request-header field.
    IM_A_TEAPOT = 418, //* Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot".
    MISDIRECTED_REQUEST = 421, //* The request was directed at a server that is not able to produce a response (for example because of connection reuse).
    UNPROCESSABLE_ENTITY = 422, //* The request was well-formed but was unable to be followed due to semantic errors.
    LOCKED = 423, //* The resource that is being accessed is locked.
    FAILED_DEPENDENCY = 424, //* The request failed because it depended on another request and that request failed.
    TOO_EARLY = 425, //* Indicates that the server is unwilling to risk processing a request that might be replayed.
    UPGRADE_REQUIRED = 426, //* The client should switch to a different protocol.
    PRECONDITION_REQUIRED = 428, //* The origin server requires the request to be conditional.
    TOO_MANY_REQUESTS = 429, //* The user has sent too many requests in a given amount of time.
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431, //* The server is unwilling to process the request because its header fields are too large.
    UNAVAILABLE_FOR_LEGAL_REASONS = 451, //* A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.

    //* Server error responses
    INTERNAL_SERVER_ERROR = 500, //* A generic error message returned when an unexpected condition was encountered on the server.
    NOT_IMPLEMENTED = 501, //* The server either does not recognize the request method or lacks the ability to fulfill the request.
    BAD_GATEWAY = 502, //* The server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request.
    SERVICE_UNAVAILABLE = 503, //* The server is not ready to handle the request. Common causes are a server undergoing maintenance or being overloaded.
    GATEWAY_TIMEOUT,
}

export default HttpStatusCodes;
