import React, { Fragment, ReactNode, useEffect, useState } from 'react';

import './index.scss';

import DropDown from '../DropDown';
import Input, { InputProps } from '../Input';
// import { PPMultiSelect } from '../PPMultiSelect';
// import PPTextArea from '../PPTextArea';

export interface FormInput extends Omit<InputProps, 'type' | 'error'> {
    type:
    //Default
    'text' | 'date' | 'datetime-local' | 'month' | 'time' | 'week' | 'email' | 'number' | 'password' | 'tel' | 'url' | 'file'
    //Personalizados
    | 'multiselect' | 'dropdown' | 'textarea',
    options?: { value: string | number, label: ReactNode, selected?: boolean, disabled?: boolean }[],
    openTrigger?: "click" | "hover"
    regex?: { exp: RegExp, help: string },
    errors?: string[],

    /**PPTextArea*/
    rows?: number,
    /**PPTextArea*/
    autoheight?: boolean,

    /**Espaço a esquerda do campo*/
    spanLeft?: string,
    /**Espaço a direita do campo*/
    spanRight?: string
};

interface FormProps {
    /**Campos do formulário*/
    fields: FormInput[],
    /**Evento onChange. Retorna todos os campos*/
    onChange?: Function,
    /**Evento onSubmit. Retorna todos os campos*/
    onSubmit?: Function,
    /**Tipo do retorno dos dados no onChange e onSubmit*/
    returnType?: "array" | "object",
    /**Continua mostrando erros do campo mesmo após editado*/
    keepErrorsOnChange?: boolean,
    /**Processo de submit em andamento (loading)*/
    submitting?: boolean,
    /**Loading do formulário (full)*/
    loading?: boolean,
    /**Personalização do botão "submit" e botões adicionais*/
    functions?: {
        hide?: boolean,
        submitButton?: {
            hide?: boolean,
            label?: string,
            disabled?: boolean,
            loading?: boolean
        },
        otherButtos?: {
            hide?: boolean,
            label: string,
            context?: "primary" | "success" | "warning" | "danger" | "info" | "grey"
            onClick: VoidFunction,
            disabled?: boolean
        }[]

    },
    updateFieldsOnChangeOrigin?: boolean
}

const PPForm: React.FC<FormProps> = (props) => {

    const [fields, setFields] = useState(props.fields);

    useEffect(() => {
        props.updateFieldsOnChangeOrigin &&
            setFields(props.fields);
    }, [props.fields])

    const convertFieldsToData = (fields: FormInput[]) => {
        let result: any;
        switch (props.returnType) {
            case "object":
                result = {};
                fields.forEach(f => { result[f.name!] = f.value; })
                return result;
            default:
                result = fields.map(f => { return { name: f.name, value: f.value } });
                return result;
        }

    }

    const onChange = (event: any) => {

        let _fields = fields;

        _fields = _fields.map(_f => {
            return _f.name === event.target.name ? {
                ..._f,
                value: event.target.value,
                errors: props.keepErrorsOnChange ? _f.errors : undefined
            } : _f
        })

        setFields(_fields);

        if (props.onChange) {
            props.onChange(convertFieldsToData(_fields));
        }
    }

    const submit = () => {

        let _fields = fields;
        let errors: string[] = [];

        _fields.forEach(f => {

            errors = [];

            try {
                if (!f.value) {
                    //required
                    f.required &&
                        errors.push(`Campo obrigatório`)

                } else {

                    //max
                    if (f.max && Number(f.value) > Number(f.max))
                        errors.push(`O valor deve ser menor ou igual a ${f.max}`)

                    //min
                    if (f.min && Number(f.value) < Number(f.min))
                        errors.push(`O valor deve ser maior ou igual a ${f.min}`)

                    //maxLength
                    if (f.maxLength) {
                        switch (f.type) {
                            case "multiselect":
                                if ((f.value as string[]).length > f.maxLength)
                                    errors.push(`No máximo ${f.maxLength} itens podem ser selecionados`)
                                break;
                            default:
                                if (f.value.toString().length > f.maxLength)
                                    errors.push(`O comprimento deve ser menor ou igual a ${f.maxLength}`)
                                break;
                        }

                    }

                    //minLength
                    if (f.minLength) {
                        switch (f.type) {
                            case "multiselect":
                                if ((f.value as string[]).length > f.minLength)
                                    errors.push(`No mínimo ${f.minLength} itens devem ser selecionados`)
                                break;
                            default:
                                if (f.value.toString().length > f.minLength)
                                    errors.push(`O comprimento deve ser maior ou igual a ${f.minLength}`)
                                break;
                        }
                    }

                    //regex
                    if (f.regex) {
                        let regex = new RegExp(f.regex.exp);
                        !regex.test(f.value.toString()) &&
                            errors.push(f.regex.help)
                    }

                }

            } catch (error) {
                console.warn({ where: "formSubmit", error });
            }

            _fields = _fields.map(g => { return g.name === f.name ? { ...g, errors: errors.length > 0 ? errors : undefined } : g });

        })

        let _hasErrors = _fields.find(g => g.errors) !== undefined;

        let _dataToSubmit = {
            validated: !_hasErrors,
            data: convertFieldsToData(_fields)
        }
        props.onSubmit &&
            props.onSubmit(_dataToSubmit);

        setFields(_fields);
    }

    const mountErrors = (errors?: string[]) => {
        return errors ? <>
            {errors.map((e, i) => <div key={i}><i className='icon icon-times text-danger' /> {e}</div>)}
        </> : undefined
    }

    return (
        <div className="form">
            {
                props.loading ?
                    <div className='loading'>
                        <i className='icon icon-loading icon-spin' />
                    </div>
                    :
                    <>
                        <div className="fields">

                            {
                                fields
                                    .map(f => { return { ...f, value: f.value || "" } })
                                    .map((f, i) => {

                                        if (!f.hidden) {
                                            switch (f.type) {

                                                // case "multiselect":
                                                //     return <Fragment key={i}>
                                                //         {f.spanLeft && <span style={{ width: f.spanLeft }}></span>}
                                                //         <PPMultiSelect
                                                //             key={i}
                                                //             name={f.name}
                                                //             onChange={onChange}
                                                //             options={f.options!}
                                                //             disabled={f.disabled}
                                                //             placeholder={f.placeholder}
                                                //             readOnly={f.readOnly || props.submitting}
                                                //             required={f.required}
                                                //             error={{ show: (f.errors !== undefined), help: mountErrors(f.errors) }}
                                                //             title={f.title}
                                                //             width={f.width as any}
                                                //             openTrigger={f.openTrigger || "click"}
                                                //         />
                                                //         {f.spanRight && <span style={{ width: f.spanRight }} ></span>}
                                                //     </Fragment>

                                                case "dropdown":
                                                    return <Fragment key={i}>
                                                        {f.spanLeft && <span style={{ width: f.spanLeft }}></span>}
                                                        <DropDown
                                                            key={i}
                                                            name={f.name}
                                                            onChange={onChange}
                                                            options={f.options!}
                                                            disabled={f.disabled}
                                                            placeholder={f.placeholder}
                                                            readOnly={f.readOnly || props.submitting}
                                                            required={f.required}
                                                            error={{ show: (f.errors !== undefined), help: mountErrors(f.errors) }}
                                                            title={f.title}
                                                            width={f.width as any}
                                                            value={f.value as any}
                                                            openTrigger={f.openTrigger || "click"}
                                                        />
                                                        {f.spanRight && <span style={{ width: f.spanRight }} ></span>}
                                                    </Fragment>

                                                // case "textarea":
                                                //     return <Fragment key={i}>
                                                //         {f.spanLeft && <span style={{ width: f.spanLeft }}></span>}
                                                //         <PPTextArea
                                                //             {...f}
                                                //             key={i}
                                                //             onChange={onChange}
                                                //             error={{ show: (f.errors !== undefined), help: mountErrors(f.errors) }}
                                                //             width={f.width as any}
                                                //             readOnly={f.readOnly || props.submitting}
                                                //             rows={f.rows}
                                                //             autoheight={f.autoheight}
                                                //         />
                                                //         {f.spanRight && <span style={{ width: f.spanRight }} ></span>}
                                                //     </Fragment>

                                                default:
                                                    const { options, openTrigger, regex, spanLeft, spanRight, ..._f } = f;
                                                    return <Fragment key={i}>
                                                        {spanLeft && <span style={{ width: spanLeft }}></span>}
                                                        <Input
                                                            {..._f}
                                                            key={i}
                                                            type={f.type as any}
                                                            onChange={onChange}
                                                            readOnly={f.readOnly || props.submitting}
                                                            error={{ show: (f.errors !== undefined), help: mountErrors(f.errors) }}
                                                        />
                                                        {spanRight && <span style={{ width: spanRight }} ></span>}
                                                    </Fragment>
                                            }
                                        } else
                                            return null
                                    })
                            }
                            {props.children}
                            {/* {
                                props.children &&
                                <div className="others"></div>
                            } */}
                        </div>
                        <div className={`functions${props.functions?.hide ? ' hide' : ''}`}>
                            <button className='pp-button'
                                disabled={props.functions?.submitButton?.disabled || props.submitting}
                                onClick={() => props.onSubmit && submit()}>
                                {
                                    !props.submitting ?
                                        <>{props.functions?.submitButton?.label || "Salvar"}</>
                                        : <i className='icon icon-loading icon-spin icon-2x' />
                                }
                            </button>
                            {
                                props.functions?.otherButtos?.map((b, i) => {
                                    return <button key={i}
                                        className={`pp-button bg-${b.context || 'grey'}`}
                                        disabled={b.disabled || props.submitting}
                                        onClick={b.onClick}>{b.label}</button>
                                })
                            }
                        </div>
                    </>
            }

        </div>
    );
}

export default PPForm;