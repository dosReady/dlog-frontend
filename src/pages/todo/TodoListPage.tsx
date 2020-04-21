import * as React from 'react';
import BasicTemplate from 'components/templates/BasicTemplate';

interface Props {}
interface State {}

class TodoListPage extends React.Component<Props, State> {

    render = (): JSX.Element => {
        return (
            <BasicTemplate>
                Hello World
            </BasicTemplate>
        )
    }
}

export default TodoListPage;