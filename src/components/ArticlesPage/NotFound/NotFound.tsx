import styles from './NotFound.module.scss'

type Props = {
  query: string
}

const NotFound = ({ query }: Props) => {
  return (
    <div className={styles.notFound}>
      <h3>По запросу “{query}” ничего не найдено</h3>
      <ul>
        <li>Убедитесь, что все слова написаны без ошибок</li>
        <li>Попробуйте использовать другие ключевые слова </li>
        <li>Попробуйте уменьшить количество слов в запросе</li>
      </ul>
    </div>
  )
}

export default NotFound
