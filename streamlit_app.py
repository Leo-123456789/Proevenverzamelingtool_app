import streamlit as st
from pathlib import Path
import os

# Force cache clear on every run
st.set_page_config(
    page_title="Proevenverzamelingtool",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom styling
st.markdown("""
    <style>
    [data-testid="stAppViewContainer"] {
        background-color: #f9fafb;
    }
    </style>
    """, unsafe_allow_html=True)

# Get absolute path to dist folder
current_dir = Path(__file__).parent
dist_path = current_dir / "dist" / "index.html"

# Check if dist exists with absolute path resolution
if dist_path.exists() and dist_path.is_file():
    try:
        # Serve React app directly
        with open(dist_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
        st.components.v1.html(html_content, height=1200, scrolling=True)
    except Exception as e:
        st.error(f"Error loading app: {str(e)}")
        st.info(f"Debug - Looking for: {dist_path}")
        st.info(f"Path exists: {dist_path.exists()}")
else:
    st.title("📊 Proevenverzamelingtool")
    st.warning("**Build Required**")
    st.markdown(f"""
    The React frontend hasn't been built yet.
    
    **Debug Info:**
    - Looking for file at: `{dist_path}`
    - File exists: {dist_path.exists()}
    - Current directory: `{current_dir}`
    
    **To build the frontend locally:**
    
    ```bash
    npm install --legacy-peer-deps
    npm run build
    ```
    
    Or on Streamlit Cloud, the files will be auto-detected once built.
    
    **Features Coming Soon:**
    - ✅ Upload Excel files (.xlsx, .xls, .csv)
    - ✅ View data in interactive table
    - ✅ Export data to CSV
    - ✅ Load sample data for testing
    - ✅ Responsive design
    - ✅ Full TypeScript support
    """)
