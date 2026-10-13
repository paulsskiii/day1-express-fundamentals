const errorHandler = require('../middleware/errorHandler');

function run(err, env) {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = env;
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  errorHandler(err, {}, res, () => {});
  process.env.NODE_ENV = original;
  return { status: res.status.mock.calls[0][0], body: res.json.mock.calls[0][0] };
}

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('hides the message of a 500 error in production', () => {
  const result = run(new Error('E11000 duplicate key on shopfront-prod.users'), 'production');
  expect(result.status).toBe(500);
  expect(result.body.error.message).toBe('Internal server error');
});

test('keeps the message of a 404 error in production', () => {
  const err = new Error('Task not found');
  err.statusCode = 404;
  const result = run(err, 'production');
  expect(result.status).toBe(404);
  expect(result.body.error.message).toBe('Task not found');
});

test('shows the real message of a 500 error in development', () => {
  const result = run(new Error('boom'), 'development');
  expect(result.body.error.message).toBe('boom');
});
