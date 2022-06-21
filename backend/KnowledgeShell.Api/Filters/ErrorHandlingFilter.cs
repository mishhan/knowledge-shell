using KnowledgeShell.Api.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace KnowledgeShell.Api.Filters;

public class ErrorHandlingFilter : ExceptionFilterAttribute
{
    public override void OnException(ExceptionContext context)
    {
        var exception = context.Exception;
        if (exception is not HttpException httpException) return;
        context.Result = new JsonResult(httpException.Message) { StatusCode = (int?)httpException.StatusCode };
        context.ExceptionHandled = true;
    }
}