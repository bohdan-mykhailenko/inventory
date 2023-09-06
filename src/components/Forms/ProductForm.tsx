import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Product } from '../../types/Product';
import { Button } from 'react-bootstrap';
import { CloseButton } from '../CloseButton';
import styles from './Form.module.scss';

interface ProductFormProps {
  onRemoveModal: () => void;
}

const productValidationSchema = Yup.object<Product>({
  id: Yup.number(),
  serialNumber: Yup.number().required('Serial Number is required'),
  isNew: Yup.boolean().required('Is New is required'),
  isRepairing: Yup.boolean().required('Is Repairing is required'),
  photo: Yup.mixed().test(
    'fileType',
    'Only image files are allowed',
    (value) => {
      if (!value) {
        return true;
      }

      if (value instanceof File) {
        const fileExtension = value.name.split('.').pop()?.toLowerCase();

        if (fileExtension) {
          const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
          return allowedExtensions.includes(fileExtension);
        }
      }

      return false;
    },
  ),
  title: Yup.string().trim().required('Title is required'),
  type: Yup.string().required('Type is required'),
  specification: Yup.string().required('Specification is required'),
  guarantee: Yup.object({
    start: Yup.string(),
    end: Yup.string(),
  }),
  price: Yup.array().of(
    Yup.object({
      value: Yup.number(),
      symbol: Yup.string(),
      isDefault: Yup.number(),
    }),
  ),
  order: Yup.number().required('Order is required'),
  date: Yup.string()
    .required('Date is required')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Date must be in the format YYYY-MM-DD (e.g., 2023-09-05)',
    ),
});

export const ProductForm: React.FC<ProductFormProps> = ({ onRemoveModal }) => {
  const initialValues: Product = {
    id: 0,
    serialNumber: 0,
    isNew: false,
    isRepairing: false,
    photo: '',
    title: '',
    type: '',
    specification: '',
    guarantee: {
      start: '',
      end: '',
    },
    price: [
      {
        value: 0,
        symbol: '',
        isDefault: 0,
      },
    ],
    order: 0,
    date: '',
  };

  const handleSubmit = async (values: Product) => {
    console.log(values);

    try {
      // Normalize and send data to the API
      // const normalizedData = {
      //   ...values,
      //   title: values.title.replace(/\s{2,}/g, ' '),
      // };
      // const response = await axios.post('API_URL', normalizedData);
      alert('Form submitted with data:');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      onRemoveModal();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles['form--product']}>
        <div className={styles.form__formGroup}>
          <label htmlFor="title">Title:</label>
          <Field type="text" id="title" name="title" />
          <ErrorMessage
            name="title"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="serialNumber">Serial Number:</label>
          <Field type="text" id="serialNumber" name="serialNumber" />
          <ErrorMessage
            name="serialNumber"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="photo">Photo:</label>
          <Field type="file" id="photo" name="photo" />
          <ErrorMessage
            name="photo"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="type">Type:</label>
          <Field type="text" id="type" name="type" />
          <ErrorMessage
            name="type"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="specification">Specification:</label>
          <Field type="text" id="specification" name="specification" />
          <ErrorMessage
            name="specification"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="guarantee.start">Guarantee Start:</label>
          <Field type="text" id="guarantee.start" name="guarantee.start" />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="guarantee.end">Guarantee End:</label>
          <Field type="text" id="guarantee.end" name="guarantee.end" />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="price[0].value">Price Value:</label>
          <Field type="text" id="price[0].value" name="price[0].value" />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="price[0].symbol">Price Symbol:</label>
          <Field type="text" id="price[0].symbol" name="price[0].symbol" />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="price[0].isDefault">Is Default:</label>
          <Field
            type="text"
            id="price[0].isDefault"
            name="price[0].isDefault"
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="order">Order:</label>
          <Field type="text" id="order" name="order" />
          <ErrorMessage
            name="order"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="date">Date:</label>
          <Field type="text" id="date" name="date" />
          <ErrorMessage
            name="date"
            component="div"
            className={styles.form__error}
          />
        </div>

        {/* Add the checkbox fields here */}

        <div className={styles.form__actions}>
          <Button
            onClick={onRemoveModal}
            className={`${styles['form__actions-button']} ${styles['form__actions-button--cancel']}`}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className={`${styles['form__actions-button']} ${styles['form__actions-button--add']}`}
          >
            Add
          </Button>

          <CloseButton onClose={onRemoveModal} />
        </div>
      </Form>
    </Formik>
  );
};