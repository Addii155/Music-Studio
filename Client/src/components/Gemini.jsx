import React, { useState } from 'react';
import axios from 'axios';

const GenerateContent = () => {
    const [prompt, setPrompt] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/v1/generate    ', { prompt });
            setContent(response.data.content);
        } catch (err) {
            setError('Failed to generate content');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Generate Content</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                    required
                />
                <button type="submit" disabled={loading}  className=' bg-white'>
                    {loading ? 'Generating...' : 'Generate'}
                </button>
            </form>
            {error && <p style={{ color: 'red',backgroundColor: 'white' }}>{error}</p>}  
            {content && <div className=' bg-white'
            ><h2>Generated Content:</h2><p>{content}</p></div>}
        </div>
    );
};

export default GenerateContent;
