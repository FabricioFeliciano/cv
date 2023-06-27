import React, { ReactNode, useEffect, useState } from "react";

import './index.scss';

interface Props {
    name?: string,
    options: { value: string | number, label: ReactNode, disabled?: boolean }[],
    onChange: Function,
    onFilter?: Function,
    showFilter?: boolean,
    showOptions?: boolean,
    required?: boolean,
    openTrigger?: "click" | "hover",
    title?: ReactNode,
    error?: { show: boolean, help: ReactNode },
    placeholder?: string,
    top?: boolean
    right?: boolean,
    width?: string,
    disabled?: boolean,
    readOnly?: boolean,
    //closeDelay?: number

    value?: (string | number)[]
}

const MultiSelect: React.FC<Props> = (props) => {

    const [listVisible, setListVisible] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [selected, setSelected] = useState<(string | number)[]>(props.value || []);
    const [filter, setFilter] = useState('');
    const [topLimit, setTopLimit] = useState(false);
    const [listTop, setListTop] = useState(0);
    const [width, setWidth] = useState(0);
    const [top, setTop] = useState(props.top);

    useEffect(() => {
        (!props.disabled && !props.readOnly) &&
            props.onChange({
                target: {
                    name: props.name,
                    value: selected
                }
            })
    }, [selected])

    const changeVisibility = (value: boolean) => {
        (!props.disabled && !props.readOnly) &&
            setListVisible(value);
    }

    useEffect(() => {
        props.onFilter && (!props.disabled && !props.readOnly) &&
            props.onFilter(filter);
    }, [filter])

    const getItemsSize = () => {

        let length = props.options.length;
        let filterSize = props.showFilter ? 32 : 0;

        let val = !listVisible
            ?
            0
            :
            (
                length >= 6
                    ?
                    filterSize + (32 * 6) + 1
                    :
                    filterSize + (length * 32) + 1
            );
        return val;
    }

    const onScroll = (event: any) => {
        event.target.className !== 'items' &&
            setListVisible(false);
    }
    useEffect(() => {
        window.addEventListener('scroll', onScroll, true)
        return () => {
            window.removeEventListener("scroll", onScroll, true);
        }
    }, [])

    //Delay close 
    var timerVisibility: any;
    const onMouseLeave = () => {
        setFilter("");
        clearTimeout(timerVisibility);
        timerVisibility = setTimeout(() => changeVisibility(false), 250);
    }

    const calcBottomLimit = (length: number) => {
        setTop(getItemsSize() > length);
    }

    return (
        <div className={`multiselect${props.disabled ? " disabled" : ""}${props.readOnly ? " readonly" : ""}`}
            ref={(ref: any) => {
                if (ref) {
                    calcBottomLimit(window.innerHeight - ref.getClientRects()[0].bottom);
                    setListTop(ref.getClientRects()[0].top + (props.title ? (!top ? 59 : 21) : (!top ? 40 : 0)))
                }
            }}
            style={{ width: props.width || undefined }}
            onMouseOver={() => {
                (props.openTrigger === "hover" && !props.error?.show) &&
                    changeVisibility(true);
                clearTimeout(timerVisibility);
            }}
            onMouseLeave={() => { onMouseLeave() }}
            onClick={(event: any) => {
                event.target.id === 'items' &&
                    changeVisibility(!listVisible);
            }}
        >

            {
                props.title &&
                <div className="title">{props.title}</div>
            }

            <div
                id="field"
                className={`field${(!props.disabled && !props.readOnly) && props.required ? ' required' : ''}${props.error?.show ? ' error' : ''}${listVisible ? " active" : ""}`}
                ref={(ref: any) => {
                    if (ref) {
                        setWidth(ref.offsetWidth || 0);
                    }
                }}
                onMouseOver={(event: any) => {
                    setTooltipVisible(true);

                    if (event && event.target) {
                        let _rect = event.target.getClientRects();

                        //Calc bottom limit
                        let xtop = window.innerHeight - _rect[0].bottom < 80;
                    }
                }}
                onMouseLeave={() => {
                    setTooltipVisible(false);
                }}
            >

                <div id="items" className="items">
                    {
                        selected.length === 0 &&
                        <span className="placeholder" onClick={() => { changeVisibility(!listVisible) }}>{props.placeholder || ((props.openTrigger === "click" || props.error?.show) && "Clique para selecionar")}</span>
                    }
                    {
                        selected.map((s, i) => {
                            return <div key={i} className="item" onClick={() => { changeVisibility(!listVisible) }}>
                                {props.options.find(o => o.value === s)?.label}
                            </div>
                        })
                    }
                    <div className="shadow"></div>
                </div>

                <div className="icons">
                    {
                        !(props.required || props.readOnly || props.disabled) && selected.length > 0 &&
                        <i className="icon icon-times" onClick={() => setSelected([])} />
                    }
                    <i className={`icon icon-chevron-${listVisible ? "up" : "down"}`} onClick={() => (!props.disabled || !props.readOnly) && changeVisibility(!listVisible)} />
                </div>

            </div>

            <div className={`list${props.right ? ' right' : ''}${top ? ' top' : ''}`}
                style={{ top: listTop, width: width }}>

                <div className="body"
                    style={{
                        height: getItemsSize() + 'px',
                        maxHeight: props.showFilter ? (32 * 7) : (32 * 6),
                        opacity: listVisible ? 1 : 0,
                        overflow: listVisible ? 'unset' : 'hidden'
                    }}
                >

                    {
                        props.showOptions &&
                        <div className="options">
                            {
                                props.options.find(o => !selected.includes(o.value)) ?
                                    <span className="option" onClick={() => { setSelected(props.options.map(o => o.value)) }}>Selecionar tudo</span>
                                    :
                                    <span className="option" onClick={() => { setSelected([]) }}>Desselecionar tudo</span>
                            }
                            <span className="option" onClick={() => {
                                setSelected(props.options.filter(o => !selected.includes(o.value)).map(p => p.value))
                            }}>Inverter</span>
                        </div>
                    }

                    {
                        props.showFilter &&
                        <div className="search">
                            <i className="icon icon-search icon-2x text-grey" />
                            <input type="text"
                                value={filter}
                                onChange={event => {
                                    changeVisibility(true);
                                    setFilter(event.target.value)
                                }}
                                autoComplete="off"
                                onClick={() => { props.openTrigger === "click" && changeVisibility(true) }}
                            />
                            <i className="icon icon-times icon-2x" onClick={() => setFilter("")} />
                        </div>
                    }

                    <div className="items scroll" id="items"
                        style={{ height: props.showFilter ? "calc(100% - 32px)" : "calc(100%)" }}
                    >
                        {
                            props.options
                                .filter(o => o.label?.toString().toLowerCase().includes(filter.toLowerCase()))
                                .map((o, i) => {
                                    let _selected = selected.includes(o.value);
                                    return <div
                                        key={i}
                                        className={`item${_selected ? ' selected' : ''}${o.disabled ? ' disabled' : ''}`}
                                        onClick={() => {
                                            if (!o.disabled)
                                                !_selected ? setSelected([...selected, o.value]) : setSelected(selected.filter(s => s !== o.value));
                                        }}
                                    >
                                        <i className={`icon ${_selected ? 'icon-check-square1' : 'icon-square1'}`} />
                                        {o.label}
                                    </div>
                                })
                        }
                    </div>
                </div>
            </div>

            {
                props.error && props.error.show && !listVisible &&
                <div
                    className={`help${props.right ? ' right' : ''}${top ? ' top' : ''}`}
                    style={{
                        top: listTop,
                        opacity: tooltipVisible ? 1 : 0
                    }} >
                    <div className="content">
                        {props.error.help}
                    </div>
                </div>
            }
        </div>
    );
}

export default MultiSelect