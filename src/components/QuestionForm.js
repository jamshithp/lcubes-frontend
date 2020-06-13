import React, {useState} from "react"
import {Form} from "react-bootstrap"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import Modal from "react-bootstrap/Modal"

function QuestionForm(){
    let requiredVal, jamPart = false;
    const [category, choosedCateg] = useState(null);
    //let chkError="d-none";
    if(category === "jam"){
        requiredVal = true;
        jamPart = true;
    }
    const [validated, setValidated] = useState(false);
    const [chkError,updateChkError] = useState("d-none");/*error class for checkbox */
    const [chkErrorShow,showChkError] = useState("Choose an answer");/*error messgefor checkbox */
    const [multipleChoose,multipleChoosed] = useState([]);

    const initialFormData = Object.freeze({
        question: "",
        ansr1:"",
        ansr2:"",
        ansr3:"",
        ansr4:"",
        solution:"",
        correct:"",
        partcAns:"",
        part:"",
        examCategory:category,
    });
    const [formData, updateFormData] = useState(initialFormData);
    const [modalShow, setModalShow] = useState(true);
    const handleChange = (e) => {

        if(e.target.type !== "checkbox"){
            updateFormData({
                ...formData,[e.target.name]:e.target.value
            });
        }
        else{
            if(e.target.checked){
                let a = e.target.name
                multipleChoosed(oldArray => [...oldArray, a]);
                // multipleChoose.filter(name => 
                //     name !== e.target.name
                // );
                //multipleChoosed(oldArray => [...oldArray, a]);//update choosed array
            }
            else{
                let chkexisted = 0;
                multipleChoose.map(element => { if(element === e.target.name)chkexisted = 1 ;})
                if(chkexisted === 1){
                const index = multipleChoose.findIndex(element => {return element === e.target.name})  
                multipleChoose.splice(index, 1);
                multipleChoosed(multipleChoose)
                }
            }
            updateChkError("d-none");
            // updateFormData({
            //     ...formData,[e.target.name]:e.target.checked
            //     });
        }
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if(!form.elements.correct1.checked && !form.elements.correct2.checked && !form.elements.correct3.checked && !form.elements.correct4.checked){
            event.preventDefault();
            event.stopPropagation(); 
            updateChkError("d-block");

            showChkError("Choose an answer");
        }
        if(category === "psc" && multipleChoose.length > 1){/**psc answer validation */
            event.preventDefault();
            event.stopPropagation(); 
            updateChkError("d-block");
            showChkError("Multiple answers not allowed");
        }
        console.log(category)
        if(category === "jam" && formData.part === "PART-A" && multipleChoose.length > 1){/**jam part A answer validation */
            event.preventDefault();
            event.stopPropagation(); 
            updateChkError("d-block");
            showChkError("Multiple answers not allowed");
        }
        //console.log(formData)
        setValidated(true);
        event.preventDefault()
    }
    // const examChooserHandle = (e) =>{
    //     const val = e.target.value;
    //     choosedCateg(val);
    //     console.log(val)
    //     console.log(category)
    //     setModalShow(false);
    //   }

    return(<>
        <Modal show={modalShow}
        onHide={() => setModalShow(false)}
        size="sm"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header className="justify-content-md-center">
          <Modal.Title id="contained-modal-title-vcenter">
          Choose a Question Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Form className="justify-content-md-center form-inline">
            <Form.Control as="select" onChange={(e) =>{ choosedCateg(e.target.value);setModalShow(false);}}>
            <option>Select..</option>
            <option value="psc">PSC</option>
            <option value="jam">JAM</option>
            <option value="net">NET</option>
            </Form.Control>
        </Form>
            </Modal.Body>
        </Modal>
        
        <Form onSubmit={handleSubmit} noValidate validated={validated} className="examsQuestions">
            <Form.Group controlId="formGridState">
            <Form.Label className="pr-3" style={{display:jamPart?"block":"none"}}>Choose PART</Form.Label>
            <Form.Control as="select" name="part" required={{jamPart}} onChange={handleChange} style={{display:jamPart?"block":"none"}} defaultValue="PART-A">
            <option value="PART-A">PART-A</option>
            <option value="PART-B">PART-B</option>
            <option value="PART-C">PART-C</option>
            </Form.Control>
            </Form.Group>
            <p className="mt-3">Add New Question</p>
            <Form.Group controlId="formQuestion">
                <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">Q</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control required={requiredVal}
                placeholder="Question" 
                name="question"
                as="textarea" rows="3" onChange={handleChange}/>
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAnsr1" style={{display:formData.part === "PART-C"?"none":"block"}}>
            <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">A1</InputGroup.Text>
            </InputGroup.Prepend>
                <Form.Control type="text" required={requiredVal}
                 name="ansr1" 
                 placeholder="Answer 1" onChange={handleChange}/>
            </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAnsr2" style={{display:formData.part === "PART-C"?"none":"block"}}>
            <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">A2</InputGroup.Text>
            </InputGroup.Prepend>
                <Form.Control required={requiredVal}
                type="text" 
                name="ansr2" 
                placeholder="Answer 2" onChange={handleChange}/>
            </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAnsr3" style={{display:formData.part === "PART-C"?"none":"block"}}> 
            <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">A3</InputGroup.Text>
            </InputGroup.Prepend>
                <Form.Control required={requiredVal}
                type="text" 
                name="ansr3" 
                placeholder="Answer 3" onChange={handleChange}/>
            </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAnsr4" style={{display:formData.part === "PART-C"?"none":"block"}} >
            <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">A4</InputGroup.Text>
            </InputGroup.Prepend>
                <Form.Control required={requiredVal}
                type="text" 
                name="ansr4" 
                placeholder="Answer 4" onChange={handleChange}/>
            </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" style={{display:formData.part === "PART-C"?"none":"block"}}>
            <Form.Label className="pr-3">Choose correct answer </Form.Label>
                <Form.Check inline type="checkbox" label="A1" value="1" onChange={handleChange} name="correct1"/>
                <Form.Check inline type="checkbox" label="A2" value="2" onChange={handleChange} name="correct2"/>
                <Form.Check inline type="checkbox" label="A3" value="3" onChange={handleChange} name="correct3"/>
                <Form.Check inline type="checkbox" label="A4" value="4" onChange={handleChange} name="correct4"/>
                <Form.Label className={chkError+" error"}>{chkErrorShow}</Form.Label>
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" style={{display:formData.part === "PART-C"?"block":"none"}}>
            <InputGroup>
                <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">A</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control required={requiredVal}
                placeholder="Use Numbers and Hyphen(-) example : 20 - 50" 
                name="partcAns"
                as="textarea" rows="3" onChange={handleChange}/>
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="formSolution">
                <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">Sol</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                placeholder="Solution" 
                name="solution"
                as="textarea" rows="3" onChange={handleChange}/>
                </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit">
                Add
            </Button>
        </Form>
        </>
    );
}

export default QuestionForm