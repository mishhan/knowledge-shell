using System.Linq;
using System.Net;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Serialization.Objects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace KnowledgeShell.Api.Filters;

public class ValidateModelFilter : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var isValidModel = context.ModelState.IsValid;
        if (!isValidModel)
        {
            object errorObject;
            /* json-api errors @see="https://www.jsonapi.net/usage/errors.html#errors" */
            var isJsonApiController = context.Controller is CoreJsonApiController;
            if (isJsonApiController)
            {
                var validationErrors = context.ModelState.Values
                        .SelectMany(value => value.Errors)
                        .Select(x => x.ErrorMessage);
                var validationErrorsString = string.Join(", ", validationErrors);
                errorObject = new ErrorObject(HttpStatusCode.BadRequest)
                {
                    Title = "Validation error processing request",
                    Detail = validationErrorsString
                };
            }
            else
            {
                errorObject = context.ModelState;
            }
            context.Result = new BadRequestObjectResult(errorObject);
        }

        base.OnActionExecuting(context);
    }
}