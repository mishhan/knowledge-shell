# Knowledge Shell Client

## About

[Ember.js](https://github.com/emberjs/ember.js) app with following features:

1. Styles with [Bulma](https://bulma.io/documentation/) and themes with [Bulmaswatch](https://jenil.github.io/bulmaswatch/)
2. Authentication (JWT)
3. Internationalization
4. Validations using [Vest](https://github.com/ealush/vest)
5. Drag and Drop for battle and reordeing elements in tables
6. Business logic is made on client only :upside_down_face:
   - Inference logic - see [here](./app/services/frame-production-engine.ts) and [here](./app/services/production-engine.ts)
   - Interpretation (Lexer, Set of nodes, Interpretter) - see [here](./app/interpretter)

## Running / Development

- `cd fronted`
- `npm install`
- `npm run start`
- Visit app at [http://localhost:4200](http://localhost:4200)
