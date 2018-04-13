// @flow
import * as React from 'react'
import Field from '~/components/forms/Field'
import TextField from '~/components/forms/TextField'
import { composeValidators, minValue, maxValue, mustBeNumber, mustBeEthereumAddress, required } from '~/components/forms/validator'
import Block from '~/components/layout/Block'
import Col from '~/components/layout/Col'
import Heading from '~/components/layout/Heading'
import Row from '~/components/layout/Row'
import Paragraph from '~/components/layout/Paragraph'
import { FIELD_OWNERS, getOwnerNameBy, getOwnerAddressBy } from '~/routes/open/components/fields'

type Props = {
  numOwners: number,
}

const MAX_NUMBER_OWNERS = 50

const Owners = (props: Props) => {
  const { numOwners } = props
  const validNumber = numOwners && Number.isInteger(Number(numOwners))
  const renderOwners = validNumber && Number(numOwners) <= MAX_NUMBER_OWNERS

  return (
    <Block margin="md">
      <Heading tag="h3">Owners</Heading>
      <Block margin="sm">
        <Field
          name={FIELD_OWNERS}
          component={TextField}
          type="text"
          validate={composeValidators(required, mustBeNumber, maxValue(MAX_NUMBER_OWNERS), minValue(1))}
          placeholder="Number of owners*"
          text="Number of owners"
        />
      </Block>
      { renderOwners && [...Array(Number(numOwners))].map((x, index) => (
        <Row key={`owner${(index)}`}>
          <Col xs={11} xsOffset={1}>
            <Block margin="sm">
              <Paragraph bold>Owner Nº {index + 1}</Paragraph>
              <Block margin="sm">
                <Field
                  name={getOwnerNameBy(index)}
                  component={TextField}
                  type="text"
                  validate={required}
                  placeholder="Owner Name*"
                  text="Owner Name"
                />
              </Block>
              <Block margin="sm">
                <Field
                  name={getOwnerAddressBy(index)}
                  component={TextField}
                  type="text"
                  validate={composeValidators(required, mustBeEthereumAddress)}
                  placeholder="Owner Address*"
                  text="Owner Address"
                />
              </Block>
            </Block>
          </Col>
        </Row>
      )) }
    </Block>
  )
}

export default Owners