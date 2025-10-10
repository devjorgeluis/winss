import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { callApi } from "../../utils/Utils";
import DivLoading from "../../components/DivLoading";
import ImgProfile from "/src/assets/img/profile-3d.jpg";
import IconChevronLeft from "/src/assets/svg/chevron-left.svg";
import IconChevronRight from "/src/assets/svg/chevron-right.svg";
import IconDoubleLeft from "/src/assets/svg/double-arrow-left.svg";
import IconDoubleRight from "/src/assets/svg/double-arrow-right.svg";

const ProfileHistory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { contextData } = useContext(AppContext);

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        start: 0,
        length: 5,
        totalRecords: 0,
        currentPage: 1,
    });

    const formatOperation = (operation, value) => {
        return operation === "change_balance" && parseFloat(value) > 0
            ? "Depósito"
            : operation === "change_balance"
                ? "Retiro"
                : operation;
    };

    const handlePageChange = (page) => {
        setPagination((prev) => ({
            ...prev,
            start: (page - 1) * prev.length,
            currentPage: page,
        }));
    };

    const fetchHistory = () => {
        setLoading(true);

        let queryParams = new URLSearchParams({
            start: pagination.start,
            length: pagination.length,
        }).toString();
        let apiEndpoint = `/get-history?${queryParams}`;

        callApi(
            contextData,
            "GET",
            apiEndpoint,
            (response) => {
                if (response.status === "0") {
                    setTransactions(response.data);
                    setPagination((prev) => ({
                        ...prev,
                        totalRecords: response.recordsTotal || 0,
                    }));
                } else {
                    setTransactions([]);
                }
                setLoading(false);
            },
            null
        );
    };

    const handleSubmit = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        setPagination((prev) => ({ ...prev, start: 0, currentPage: 1 }));
    };

    useEffect(() => {
        if (!contextData?.session) {
            navigate("/");
        }
    }, [contextData?.session, navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        fetchHistory();
    }, [pagination.start, pagination.length,]);

    const formatDateDisplay = (dateString) => {
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${hours}:${minutes} ${day} ${month} ${year}`;
    };

    const formatBalance = (value) => {
        const num = parseFloat(value);
        return num.toLocaleString('de-DE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const totalPages = Math.ceil(pagination.totalRecords / pagination.length);

    const getVisiblePages = () => {
        const delta = 1;
        const visiblePages = [];
        let startPage = Math.max(1, pagination.currentPage - delta);
        let endPage = Math.min(totalPages, pagination.currentPage + delta);

        if (endPage - startPage + 1 < 2 * delta + 1) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + 2 * delta);
            } else {
                startPage = Math.max(1, endPage - 2 * delta);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }

        return { visiblePages, startPage, endPage };
    };

    const { visiblePages } = getVisiblePages();

    const handleFirstPage = () => handlePageChange(1);
    const handlePrevPage = () => handlePageChange(pagination.currentPage - 1);
    const handleNextPage = () => handlePageChange(pagination.currentPage + 1);
    const handleLastPage = () => handlePageChange(totalPages);

    return (
        <>
            <div className="container">
                <div className="row profile mt-3 pt-3">
                    <div className="col-md-3 col-md-pull-9 blockin">
                        <div className="profile-sidebar">
                            <div className="con-pic">
                                <div className="profile-userpic">
                                    <img src={contextData.session?.user?.profile_image || ImgProfile} className="img-responsive" alt="" />
                                </div>
                            </div>
                            <div className="profile-usertitle">
                                <div className="col-xs-12 header-name">{contextData.session?.user?.username}</div>
                                <div className="col-xs-12 header-info-user">
                                    <i className="far fa-user"></i> <strong>{contextData.session?.user?.first_name || contextData.session?.user?.username}</strong><br />
                                    <i className="far fa-envelope"></i> {contextData.session?.user?.email}
                                </div>
                            </div>
                            <div className="list-group bg-dark profile-list">
                                <a href="/profile/history" className="list-group-item list-group-item-action text-white item-list-o"><i className="far fa-clock"></i> Historial</a>
                                <a href="/profile/edit" className="list-group-item list-group-item-action text-white item-list-o"><i className="far fa-user"></i> Mi Perfil</a>
                                <a href="/profile/change-password" className="list-group-item list-group-item-action text-white item-list-o"><i className="fas fa-key"></i> Cambiar Contraseña</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9 col-md-push-3 blockin">
                        <div className="profile-content">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 header-profile">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 px-0 text-right">
                                            <a className="btn btn-md btn-success cashin cashin-open">
                                                <i className="fas fa-money-bill-wave"></i>
                                                <br />Depositar
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 px-0 balance">
                                    <div className="row">
                                        <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 px-0 mx-auto">
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 px-0 d-block mx-auto text-center">
                                                    <div className="text-white">
                                                        <p className="mb-1" style={{
                                                            letterSpacing: "2px",
                                                            fontSize: "20px",
                                                            textTransform: "uppercase",
                                                            fontWeight: "700"
                                                        }}>Balance Total</p>
                                                    </div>
                                                    <div className="bg-danger btn-block btn-md balance-total">AR$ 
                                                        <span className="walletBalance"> {formatBalance(contextData.session?.user?.balance) || ''}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-content-historial">
                            <div id="vueHistoryWallet" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <div className="row">
                                    <div className="col-xl-10 pull-left header-name"><i className="far fa-clock"></i> Historial</div>
                                </div>

                                <div className="table-striped table-sm table-dark table-responsive-lg">
                                    <div className="v-table__overflow">
                                        <table className="v-datatable v-table theme--light">
                                            <thead>
                                                <tr>
                                                    <th role="columnheader" scope="col" className="column text-xs-center">Fecha</th>
                                                    <th role="columnheader" scope="col" className="column text-xs-center">#Referencia</th>
                                                    <th role="columnheader" scope="col" className="column text-xs-center">Descripción</th>
                                                    <th role="columnheader" scope="col" className="column text-xs-center">Plataforma</th>
                                                    <th role="columnheader" scope="col" className="column text-xs-center">Débito</th>
                                                    <th role="columnheader" scope="col" className="column text-xs-center">Crédito</th>
                                                    <th role="columnheader" scope="col" className="column text-xs-center">Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading ? (
                                                    <tr>
                                                        <td colSpan="7" className="text-xs-center">
                                                            <DivLoading />
                                                        </td>
                                                    </tr>
                                                ) : transactions.length > 0 ? (
                                                    transactions.map((txn) => (
                                                        <tr key={txn.id}>
                                                            <td className="text-xs-center">{formatDateDisplay(txn.created_at || txn.created_at_formatted)}</td>
                                                            <td className="text-xs-center">{txn.apigames_game?.name}</td>
                                                            <td className="text-xs-center">{formatOperation(txn.operation, txn.value)}</td>
                                                            <td className="text-xs-center"></td>
                                                            <td className="text-xs-center"></td>
                                                            <td className="text-xs-center"></td>
                                                            <td className="text-xs-center">{formatBalance(txn.value_after)}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7" className="text-xs-center">No data available</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    {totalPages > 1 && (
                                        <div className="pay-history-desktop__paginator">
                                            <div className="paginator-desktop">
                                                <div className="paginator-desktop__main">
                                                    {pagination.currentPage > 1 && (
                                                        <>
                                                            <div
                                                                className="paginator-desktop__item"
                                                                onClick={handleFirstPage}
                                                            >
                                                                <span className="paginator-desktop__item-value paginator-desktop__item-value_first">
                                                                    <img src={IconDoubleLeft} alt="first" width={14} />
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="paginator-desktop__item"
                                                                onClick={handlePrevPage}
                                                            >
                                                                <span className="paginator-desktop__item-value">
                                                                    <img src={IconChevronLeft} alt="before" width={14} />
                                                                </span>
                                                            </div>
                                                        </>
                                                    )}

                                                    {visiblePages.map((page) => (
                                                        <div
                                                            key={page}
                                                            className={`paginator-desktop__item ${page === pagination.currentPage ? "paginator-desktop__item_current" : ""}`}
                                                            onClick={() => handlePageChange(page)}
                                                        >
                                                            <span className={`paginator-desktop__item-value ${page === pagination.currentPage ? "paginator-desktop__item-value_current" : ""}`}>
                                                                {page}
                                                            </span>
                                                        </div>
                                                    ))}

                                                    {pagination.currentPage < totalPages && (
                                                        <>
                                                            <div
                                                                className="paginator-desktop__item"
                                                                onClick={handleNextPage}
                                                            >
                                                                <span className="paginator-desktop__item-value">
                                                                    <img src={IconChevronRight} alt="next" width={14} />
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="paginator-desktop__item"
                                                                onClick={handleLastPage}
                                                            >
                                                                <span className="paginator-desktop__item-value paginator-desktop__item-value_last">
                                                                    <img src={IconDoubleRight} alt="last" width={14} />
                                                                </span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ProfileHistory;
