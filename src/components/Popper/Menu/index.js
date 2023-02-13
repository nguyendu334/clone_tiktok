import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {

}

export default function Menu({ children, items = [], onChange = defaultFn }) {

    const [history, setHisstory] = useState([
        {
            data: items,
        },
    ]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHisstory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item)
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            interactive
            delay={[0, 700]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title="Language"
                                onBack={() => {
                                    setHisstory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}
