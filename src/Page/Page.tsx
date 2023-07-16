import Error from '../components/Error/Error';
import Forecast from '../components/Forecast/Forecast';
import Form from '../components/Form/Form';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';
import useForecast from '../hooks/useForecast';
import styles from './Page.module.css';

const Page = () => {
  const { isError, isLoading, forecast, submitRequest } = useForecast();

  const onSubmit = (value: any) => {
    submitRequest(value);
  };

  return (
    <>
      <Header />
      <div className={styles.search}>
        <Form submitSearch={onSubmit} />
        {isError && <Error message={isError} />}
        {isLoading && <Loader />}
      </div>
      {forecast && !isLoading && !isError && <Forecast forecast={forecast} />}
    </>
  );
};

export default Page;
