namespace KnowledgeShell.Api.Filters
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;
    using KnowledgeShell.Api.Exceptions;

    public class ErrorHandlingFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            if (exception is HttpException)
            {
                var httpException = exception as HttpException;
                context.Result = new JsonResult(httpException.Message) { StatusCode = (int?)httpException.StatusCode };
                context.ExceptionHandled = true;
            }
        }
    }
}
