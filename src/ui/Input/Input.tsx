'use client'
import React, { ChangeEvent, FormEvent, ForwardedRef, RefObject } from 'react'

import CloseIcon from '@/ui/Input/CloseIcon/CloseIcon'

import styles from './Input.module.scss'

import SearchIcon from '@public/icons/search.svg'
import FilterIcon from '@public/icons/sources/sources.svg'

import { StyleProps } from '@/types/styleProps'

export type EnterKeyHint =
  | 'enter'
  | 'done'
  | 'go'
  | 'next'
  | 'previous'
  | 'search'
  | 'send'

type Props = StyleProps & {
  value: string
  reactRef?: RefObject<HTMLInputElement | null>
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  onBlur?: () => void
  onSubmit?: (e: FormEvent) => void
  onClear: () => void
  onClick?: () => void
  filter?: boolean
  onFilterClick?: () => void
  enterKeyHint?: EnterKeyHint
}

const Input = (
  {
    className,
    style,
    reactRef,
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    onSubmit,
    onClear,
    onClick,
    enterKeyHint,
    onFilterClick,
    filter
  }: Props,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div
      className={`${className} ${styles.input}`}
      style={style}
      onClick={onClick}
      ref={ref}
    >
      <SearchIcon
        className={styles.input__icon}
        onClick={onSubmit}
        tabIndex={0}
        onKeyDown={e => e.key == 'Enter' && onSubmit && onSubmit(e)}
        role={'button'}
        aria-label={'Поиск'}
      />
      <input
        className={styles.input__input}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        ref={reactRef}
        onFocus={onFocus}
        onBlur={onBlur}
        enterKeyHint={enterKeyHint}
      />
      {filter && (
        <FilterIcon
          className={
            value.length === 0
              ? styles.input__filter_disabled
              : styles.input__filter
          }
          tabIndex={0}
          onClick={onFilterClick}
          onKeyDown={e => e.key == 'Enter' && onFilterClick && onFilterClick()}
          aria-label={'Фильтры'}
          role={'button'}
        />
      )}
      <CloseIcon
        className={
          value.length === 0
            ? styles.input__close_disabled
            : styles.input__close
        }
        tabIndex={0}
        onClick={onClear}
        aria-label={'Очистить'}
        onKeyDown={e => e.key == 'Enter' && onClear()}
        role={'button'}
      />
    </div>
  )
}

export default React.forwardRef(Input)
