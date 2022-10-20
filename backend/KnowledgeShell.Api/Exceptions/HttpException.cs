using System;
using System.Net;

namespace KnowledgeShell.Api.Exceptions;

public class HttpException : Exception
{
    public HttpException(HttpStatusCode statusCode, string message) : base(message)
    {
        StatusCode = statusCode;
    }

    public HttpStatusCode StatusCode { get; set; }
}