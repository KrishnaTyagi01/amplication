import { builders, namedTypes } from "ast-types";
import { Entity, EntityField } from "../../../types";
import { classDeclaration, NamedClassDeclaration } from "../../../util/ast";
import { createFieldClassProperty } from "./create-field-class-property";
import { InputTypeEnum } from "./input-type-enum";
import { INPUT_TYPE_ID } from "./nestjs-graphql.util";

const INPUT_TYPE_DECORATOR = builders.decorator(
  builders.callExpression(INPUT_TYPE_ID, [])
);

export function createInput(
  id: namedTypes.Identifier,
  fields: EntityField[],
  entity: Entity,
  allFieldsOptional: boolean,
  isQuery: boolean,
  inputType: InputTypeEnum
): NamedClassDeclaration {
  const properties = fields.map((field) =>
    createFieldClassProperty(
      field,
      entity,
      allFieldsOptional || !field.required,
      isQuery,
      false,
      inputType
    )
  );
  const decorators = properties.length ? [INPUT_TYPE_DECORATOR] : [];
  return classDeclaration(
    id,
    builders.classBody(properties),
    null,
    decorators
  ) as NamedClassDeclaration;
}
