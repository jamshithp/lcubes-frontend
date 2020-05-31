import React, {useState} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"

function ObjectiveQuestion(){
    const [validated, setValidated] = useState(false);
    const initialFormData = Object.freeze({
        question: "",
        ansr1:"",
        ansr2:"",
        ansr3:"",
        ansr4:"",
        correct1:"",
        correct2:"",
        correct3:"",
        correct4:"",
    });
    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        console.log(formData);
        alert(formData);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        event.preventDefault();
    }

    return(
        <div className="container">
        <Form onSubmit={handleSubmit} noValidate validated={validated} className="objective-q">
            <p className="mt-3">Add New Question</p>
            <Form.Group controlId="formQuestion">
                <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">Q</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control required
                placeholder="Question" 
                name="question"
                as="textarea" rows="3" onChange={handleChange}
                />
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAnsr1">
            <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">A1</InputGroup.Text>
            </InputGroup.Prepend>
                <Form.Control type="text" required
                 name="ansr1" 
                 placeholder="Answer 1" onChange={handleChange}
                 />
            </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAnsr2">
            <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">A2</InputGroup.Text>
            </InputGroup.Prepend>
                <Form.Control required
                type="text" 
                name="ansr2" 
                placeholder="Answer 2" onChange={handleChange}
                />
            </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAnsr3">
            <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">A3</InputGroup.Text>
            </InputGroup.Prepend>
                <Form.Control required
                type="text" 
                name="ansr3" 
                placeholder="Answer 3" onChange={handleChange} 
                />
            </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAnsr4">
            <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">A4</InputGroup.Text>
            </InputGroup.Prepend>
                <Form.Control required
                type="text" 
                name="ansr4" 
                placeholder="Answer 4" onChange={handleChange} 
                />
            </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
            <Form.Label className="pr-3">Choose correct answer </Form.Label>
                <Form.Check inline type="checkbox" label="A1" value="1" onChange={handleChange} name="correct1"/>
                <Form.Check inline type="checkbox" label="A2" value="2" onChange={handleChange} name="correct2"/>
                <Form.Check inline type="checkbox" label="A3" value="3" onChange={handleChange} name="correct3"/>
                <Form.Check inline type="checkbox" label="A4" value="4" onChange={handleChange} name="correct4"/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    );
}

export default ObjectiveQuestion