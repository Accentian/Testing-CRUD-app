import { Form } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"
export { FORM_ERROR } from "src/core/components/Form"

/**
 * Import the styles for CSS
 */
import styles from "src/styles/Home.module.css"

/**
 * Modified the content by including CSS style
 */
export function ProjectForm(props) {
  return (
    <div className={styles.body}>
      <code>
        <Form {...props}>
          <LabeledTextField name="name" label="Name" placeholder="Name" />
          <LabeledTextField name="description" label="Description" placeholder="Description" />
        </Form>
      </code>
    </div>
  )
}
