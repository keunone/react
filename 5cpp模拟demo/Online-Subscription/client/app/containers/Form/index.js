/**
 *
 * Form
 *
 */

import { createForm } from 'rc-form'
import React, { Component } from 'react'
import { getCommonDecorator } from '../../utils/formDecorator'
import IconContainer from '../../components/IconContainer'

class Form extends Component {
  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value)
    })
  }

  render() {
    const { getFieldError, getFieldDecorator } = this.props.form
    const fields = [
      {
        name: 'username',
        decorator: getCommonDecorator(true),
        dom: () => (
          <input placeholder="username" />
        )
      },
      {
        name: 'password',
        decorator: getCommonDecorator(true),
        dom: () => <input placeholder="password" />
      },
      {
        name: 'phone',
        decorator: getCommonDecorator(true, 'phone'),
        dom: () => (<input placeholder="phone" />)
      },
      {
        name: 'type',
        decorator: getCommonDecorator(true),
        dom: () => (
          <select>
            <option value="">请选择</option>
            <option value="1">类型1</option>
            <option value="2">类型2</option>
            <option value="3">类型3</option>
          </select>
        )
      }
    ]
    return (
      <div>
        {
          fields.map(
            item => {
              const key = item.name
              return (
                <IconContainer key={key} type={getFieldError(key) ? 'warn' : 'success'}>
                  {getFieldDecorator(key, item.decorator)(item.dom(key))}
                </IconContainer>
              )
            }
          )
        }
        <button onClick={this.submit}>submit</button>
      </div>
    )
  }
}

export default createForm()(Form)