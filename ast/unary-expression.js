const Type = require('./type');

module.exports = class UnaryExpression {
  constructor(op, operand) {
    Object.assign(this, { op, operand });
  }

  analyze(context) {
    this.operand.analyze(context);
    if (this.op === '-') {
      if (!this.operand.type.isCompatibleWith(Type.NUMBER)) {
        throw new Error('neg op can only be applied to numbers');
      }
    } else if (this.op === 'not') {
      if (!this.operand.type.isCompatibleWith(Type.BOOLEAN)) {
        throw new Error('not can only be applied to booleans');
      }
    }
    this.type = this.operand.type;
  }

  optimize() {
    this.operand = this.operand.optimize();
    if (this.op === 'not') {
      return (!this.operand.value);
    // eslint-disable-next-line no-else-return
    } else if (this.op === '-') {
      return (-this.operand.value);
    }
    return this;
  }
};
