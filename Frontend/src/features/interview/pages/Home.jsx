import React, { useState, useRef } from 'react';
import '../style/Home.scss';

const Home = () => {
    // Local UI states
    const [jobDescription, setJobDescription] = useState('');
    const [selfDescription, setSelfDescription] = useState('');
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    
    const fileInputRef = useRef(null);
    const maxChars = 5000;

    // Handle text changes
    const handleJobDescChange = (e) => {
        if (e.target.value.length <= maxChars) {
            setJobDescription(e.target.value);
        }
    };

    const handleSelfDescChange = (e) => {
        setSelfDescription(e.target.value);
    };

    // Handle file selection
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    // Drag and drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            // Basic validation
            if (droppedFile.size <= 5 * 1024 * 1024) { // 5MB limit
                setFile(droppedFile);
            } else {
                alert('File size exceeds 5MB limit.');
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeFile = (e) => {
        e.stopPropagation();
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>
                    Create Your Custom <span className="highlight-gradient">Interview Plan</span>
                </h1>
                <p className="subtitle">
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </p>
            </header>

            <main className="home-main">
                <div className="interview-builder-card">
                    {/* Workspace Panels */}
                    <div className="panels-container">
                        
                        {/* Left Panel: Target Job Description */}
                        <section className="panel left-panel">
                            <div className="panel-header">
                                <div className="header-title-group">
                                    <svg className="panel-icon icon-red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                                    </svg>
                                    <h2>Target Job Description</h2>
                                </div>
                                <span className="badge badge-required">REQUIRED</span>
                            </div>
                            
                            <div className="textarea-container">
                                <textarea
                                    id="jobDescription"
                                    placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                                    value={jobDescription}
                                    onChange={handleJobDescChange}
                                />
                                <div className="char-counter">
                                    {jobDescription.length} / {maxChars} chars
                                </div>
                            </div>
                        </section>

                        {/* Right Panel: Your Profile */}
                        <section className="panel right-panel">
                            <div className="panel-header">
                                <div className="header-title-group">
                                    <svg className="panel-icon icon-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                    <h2>Your Profile</h2>
                                </div>
                            </div>

                            <div className="profile-section">
                                <div className="sub-header">
                                    <h3>Upload Resume</h3>
                                    <span className="badge badge-pink">BEST RESULTS</span>
                                </div>

                                <div 
                                    className={`drag-drop-zone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={triggerFileInput}
                                >
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept=".pdf,.docx"
                                        style={{ display: 'none' }}
                                    />
                                    
                                    {!file ? (
                                        <div className="dropzone-content">
                                            <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                                <polyline points="17 8 12 3 7 8"/>
                                                <line x1="12" x2="12" y1="3" y2="15"/>
                                            </svg>
                                            <p className="primary-text">Click to upload or drag & drop</p>
                                            <p className="secondary-text">PDF or DOCX (Max 5MB)</p>
                                        </div>
                                    ) : (
                                        <div className="file-display">
                                            <svg className="doc-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                                <polyline points="14 2 14 8 20 8"/>
                                            </svg>
                                            <div className="file-info">
                                                <p className="file-name">{file.name}</p>
                                                <p className="file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                            </div>
                                            <button className="remove-file-btn" onClick={removeFile} title="Remove file">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="18" x2="6" y1="6" y2="18"/>
                                                    <line x1="6" x2="18" y1="6" y2="18"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="or-divider">
                                <span>OR</span>
                            </div>

                            <div className="profile-section">
                                <h3 className="section-title-simple">Quick Self-Description</h3>
                                <textarea
                                    className="self-desc-textarea"
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                    value={selfDescription}
                                    onChange={handleSelfDescChange}
                                />
                            </div>

                            {/* Alert/Status Callout Box */}
                            <div className="status-callout">
                                <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="12" x2="12" y1="16" y2="12"/>
                                    <line x1="12" x2="12.01" y1="8" y2="8"/>
                                </svg>
                                <p>
                                    Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Card Footer */}
                    <div className="card-footer">
                        <span className="generation-info">AI-Powered Strategy Generation - Approx 30s</span>
                        <button className="generate-btn">
                            <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            Generate My Interview Strategy
                        </button>
                    </div>
                </div>
            </main>

            <footer className="page-footer">
                <nav className="footer-nav">
                    <a href="#privacy">Privacy Policy</a>
                    <span className="divider"></span>
                    <a href="#terms">Terms of Service</a>
                    <span className="divider"></span>
                    <a href="#help">Help Center</a>
                </nav>
            </footer>
        </div>
    );
};

export default Home;

