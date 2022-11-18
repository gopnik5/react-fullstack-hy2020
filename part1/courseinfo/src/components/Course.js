import Header from './Header'
import Content from './Content'


const Course = ({ course }) => {

    const { name } = course;
    const { parts } = course;

    const totalExercises = parts.reduce(
        (total, current) => total + current.exercises,
        0);

    return (

        <div>
            <Header name={name} />
            <Content parts={parts} /><br/>
            <div><b>Total of {totalExercises} exercises </b></div>
        </div>
    )


}
export default Course;